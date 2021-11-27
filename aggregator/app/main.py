import ccxt # import ccxt.async_support as ccxt
import requests
import pandas as pd
import numpy as np
from time import sleep, time
# import tasks

from sqlalchemy import create_engine
from argparse import ArgumentParser

### NOTES
"""
Read OHLCV+ data from exchange and store in database.  The data will be created if it 
does not exist, otherwise appended.  Each exchange/symbol will have it's own table since
this is likely to be called async and from a celery worker.

TODO: ability to include exchange as column to be able to store multi symbols same table
TODO: automate with CLI params; call from celery workers
TODO: to use async, must include await methods
TODO: move to crontab?

Helpers:
----------
find symbols with string
> list(filter(None, [m if (m.find('ERG') != -1) else None for m in ccxt.hitbtc().load_markets()]))

get symbol in form for database
> pd.DataFrame.from_dict(ccxt.hitbtc().fetch_symbol('ERG/BTC'), orient='index').drop('info').T

if pulling from symbol, can use this to format as dataframe
> df = pd.DataFrame.from_dict(exchange.fetch_symbol(symbol), orient='index')
> df = df.drop('info') # ignore
> df.T.to_sql(tbl, con=con, if_exists='append') # transpose dataframe with default cols from ccxt

Initial:
---------
frm = exchange.parse8601('2021-10-20 00:00:00')
now = exchange.milliseconds()
symbol = 'ERG/USDT'
data = []
msec = 1000
minute = 60 * msec
hold = 30

while from_timestamp < now:
    try:
        print(exchange.milliseconds(), 'Fetching candles starting from', exchange.iso8601(from_timestamp))
        ohlcvs = exchange.fetch_ohlcv(symbol, '1m', from_timestamp)
        print(exchange.milliseconds(), 'Fetched', len(ohlcvs), 'candles')
        from_timestamp = ohlcvs[-1][0]
        data += ohlcvs
    except (ccxt.ExchangeError, ccxt.AuthenticationError, ccxt.ExchangeNotAvailable, ccxt.RequestTimeout) as error:
        print('Got an error', type(error).__name__, error.args, ', retrying in', hold, 'seconds...')
        time.sleep(hold)

"""
### ENVIRONMENT
import os
# POWERNAP = int(os.getenv('POWERNAP')) or 60 # seconds
POWERNAP = 60 # for main and using modulus on 1 minute, this should be 60s
POSTGRES_PORT = os.getenv('POSTGRES_PORT')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASS = os.getenv('POSTGRES_PASSWORD')
POSTGRES_DBNM = os.getenv('POSTGRES_DBNM')

timeframes = ['1m', '5m', '1d', '1w']

parser = ArgumentParser(description='ready, go.')
parser.add_argument('-t', '--timeframe', default='5m', choices=timeframes, help='common interval between candles')
parser.add_argument('-s', '--symbol', default='ERG/USDT', help='crypto symbol available on exchange')
parser.add_argument('-x', '--exchange', default='coinex', choices=ccxt.exchanges, help='exchange to gather candles')
parser.add_argument('-l', '--limit', default=1000, type=int, help='exchange to gather candles')
args = parser.parse_args()
exchangeName = args.exchange
symbol = args.symbol
timeframe = args.timeframe
limit = args.limit

apiKeys = {
    'coinex': {
        'ACCESS_ID': os.getenv('COINEX_ACCESS_ID'),
        'SECRET_KEY': os.getenv('COINEX_SECRET_KEY'),
    }
}
ACCESS_ID = apiKeys[exchangeName]['ACCESS_ID']
SECRET_KEY = apiKeys[exchangeName]['SECRET_KEY']

### LOGGING
import logging
level = logging.INFO # TODO: set from .env
logging.basicConfig(format="%(asctime)s %(levelname)s %(threadName)s %(name)s %(message)s", datefmt='%m-%d %H:%M', level=level)

### INIT
con = create_engine(f'postgresql://{POSTGRES_USER}:{POSTGRES_PASS}@postgres:{POSTGRES_PORT}/{POSTGRES_DBNM}')

currency = 'usd'

# import these symbols
# TODO: convert to dict {'exchange': ['coin1', 'coin2']}, or move to config file and include additional infor like exchange api keys, etc..
symbols = ['ERG/USDT', 'ETH/USDT', 'BTC/USDT']

# for xcg in ccxt.exchanges: ...
apiKey = ACCESS_ID
secret = SECRET_KEY
exchange = getattr(ccxt, exchangeName)({'apiKey': apiKey, 'secret': secret}) # exchange = eval(f'ccxt.{exchangeName}()') # alternative using eval

def cleanupHistorical(exchange, symbol, timeframes):
    """
    Delete rows older than term
    """
    cleanupAfter = {
        '1m': '3 days',
        '5m': '3 weeks',
        '1d': '3 months',
        '1w': '3 years'
    }

    try:
        for t in timeframes:
            logging.info(f'cleaned timeframe, {t}...')
            tbl = f'{exchange}_{symbol}_{t}'
            sqlCleanup = f"""delete from "{tbl}" where timestamp_utc < CURRENT_DATE - INTERVAL '{cleanupAfter[t]}'"""
            res = con.execute(sqlCleanup, con=con)
            if res.rowcount > 0:
                logging.info(f'cleaned up {res.rowcount} rows in timeframe, {t}...')

    except Exception as e: # consider narrowing exception handing from generic, "Exception"
        logging.error(f'{e}\n{res or ""}\ntable, {tbl} may not exist, sql may be incorrect ({sqlCleanup or ""}), or connection to SQL may be invalid.')
        pass

def getLatestTimestamp(tbl, since='1970-01-01T00:00:00Z', removeLatest=True):
    """
    Find last imported row and remove
    """
    try:
        sqlLatest = f'select max(timestamp_utc) as timestamp_utc from "{tbl}"'
        dfLatest = pd.read_sql(sql=sqlLatest, con=con)
    
        # from ccxt docs, indicates last close value may be inaccurate
        since = dfLatest.iloc[0]['timestamp_utc']

        # remove latest to avoid dups and provide more accurate closing value
        if removeLatest:
            sqlRemoveLatest = f"""delete from "{tbl}" where timestamp_utc = '{since}'"""
            res = con.execute(sqlRemoveLatest, con=con)
            if res.rowcount == 0:
                logging.warning('No rows deleted; maybe table is blank, or issue with latest timestamp_utc')

        return exchange.parse8601(since.isoformat())

    except Exception as e: # consider narrowing exception handing from generic, "Exception"
        logging.error(f'table, {tbl} may not exist, or connection to SQL invalid.')
        pass

    return 0

def getSigErgo():
    """
    TODO: convet to OHLC from ergo.watch, or query oracle pools directly
    """
    # total_sigrsv = 100000000000.01 # initial amount SigRSV
    # default_rsv_price = 1000000 # lower bound/default SigRSV value
    nerg2erg = 1000000000.0 # 1e9 satoshis/kushtis in 1 erg

    # ergo_platform_url: str = 'https://api.ergoplatform.com/api/v1'
    ergo_watch_api: str = 'https://ergo.watch/api/sigmausd/state'
    # oracle_pool_url: str = 'https://erg-oracle-ergusd.spirepools.com/frontendData'
    # coingecko_url: str = 'https://api.coingecko.com/api/v3' # coins/markets?vs_currency=usd&ids=bitcoin"

    # SigUSD/SigRSV
    res = requests.get(ergo_watch_api).json()
    if res:
        sigUsdPrice = 1/(res['peg_rate_nano']/nerg2erg)
        circ_sigusd_cents = res['circ_sigusd']/100.0 # given in cents
        peg_rate_nano = res['peg_rate_nano'] # also SigUSD
        reserves = res['reserves'] # total amt in reserves (nanoerg)
        liabilities = min(circ_sigusd_cents * peg_rate_nano, reserves) # lower of reserves or SigUSD*SigUSD_in_circulation
        equity = reserves - liabilities # find equity, at least 0
        if equity < 0: equity = 0
        if res['circ_sigrsv'] <= 1:
            sigRsvPrice = 0.0
        else:
            sigRsvPrice = equity/res['circ_sigrsv']/nerg2erg # SigRSV

        df = pd.DataFrame({'timestamp_utc': [int(time())], 'sigUSD': [sigUsdPrice], 'sigRSV': [sigRsvPrice]}).set_index('timestamp_utc')
        df.to_sql('ergo_sigUSD/sigRSV_continuous', con=con, if_exists='append', index_label='timestamp_utc')
    else:
        logging.error(f'did not receive valid data from: {ergo_watch_api}')

def getLatestOHLCV(exchange, symbol, since=None):
    """
    Find the latest X rows of ohlcv data from exchange and save to SQL
    """
    data = []
    limit = 1000
    timeframe = '5m'
    tf_milliseconds = 5*60*1000
    try:
        if exchange.has['fetchOHLCV']:
            # paginate latest ohlcv from exchange
            if since == None:
                since  = exchange.milliseconds() - 86400000 # 1 day

            while since < exchange.milliseconds()-tf_milliseconds:
                print(f'since: {since}...')
                data += exchange.fetch_ohlcv(symbol, timeframe=timeframe, since=since, limit=limit)
                since = int(data[len(data)-1][0])

    except Exception as e:
        logging.debug(e)

    return data

def putLatestOHLCV(ohlcv, tbl, utcLatest):
    """
    comments go here
    """
    try:
        # save ohlcv to sql
        columns = ['timestamp_utc', 'open', 'high', 'low', 'close', 'volume']
        df = pd.DataFrame(np.row_stack(ohlcv), columns=columns)
        dfLatest = df[df['timestamp_utc'] >= utcLatest].astype({'timestamp_utc': 'datetime64[ms]'}).set_index('timestamp_utc')
        dfLatest.to_sql(tbl, con=con, if_exists='append', index_label='timestamp_utc')

    except Exception as e:
        logging.debug(e)

### MAIN
if (__name__ == '__main__'):
    
    # seconds in timeframe
    polling = {
        '1m': 1,
        '5m': 5,
        '1d': 1440, 
        '1w': 10080,
    }
    
    i = 0
    # Save to local database
    while True:
        try:
            for timeframe in timeframes:
                # OHLCV for these coins
                for symbol in symbols:
                    if i % polling[timeframe] == 0:
                        logging.info(f'{exchangeName}.{symbol} polling for timeframe: {timeframe}')

                        # destination
                        tbl = f'{exchangeName}_{symbol}_{timeframe}'

                        # get latest timestamp; remove from table, if exists
                        logging.debug(f'get {tbl}...')
                        since = getLatestTimestamp(tbl)
                        
                        # get lastest X OHLCV
                        # ohlcv = getLatestOHLCV(exchange, symbol) # TODO: pagination
                        logging.debug(f'fetch {symbol}...')
                        ohlcv = exchange.fetch_ohlcv(symbol, timeframe=timeframe, since=since, limit=limit) # coinex buggy with, "since" -hack

                        # save most recent OHLCV to SQL
                        logging.debug(f'put {since}...')
                        putLatestOHLCV(ohlcv, tbl, since)

            # sigUSD/sigRSV
            if i % polling['5m'] == 0:
                logging.info(f'ergo.sigUSD/sigRSV polling for timeframe: {timeframe}')
                getSigErgo()

            # cleanup daily
            if i % polling['1d'] == 0:
                logging.debug(f'cleanup...')
                cleanupHistorical(exchangeName, symbol, timeframes)

            # polling interval
            logging.info(f'sleep for {POWERNAP}s...\n')
            i = i + 1
            sleep(POWERNAP) # seconds

        except Exception as e:
            logging.error(e)
            pass
    
