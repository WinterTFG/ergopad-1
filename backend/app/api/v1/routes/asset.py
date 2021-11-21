import requests 
import pandas as pd
# import json

from sqlalchemy import create_engine
from fastapi import APIRouter
from fastapi import Path
from fastapi import Request
from sqlalchemy.sql.schema import BLANK_SCHEMA
# from fastapi import Depends

#region BLOCKHEADER
"""
Asset API
---------
Created: vikingphoenixconsulting@gmail.com
On: 20211009
Purpose: Returns coin and token values by user, coin or wallet.

Notes: 
. Developed for ErgoHack II, October 2021
. TODO: intended to use reducers/redux model to improve testability/stability
. Replace APIs with database calls once data is populated (need supporting import scripts to maintain)
  - if keeping API calls, replace requests with async (i.e. httpx or aiohttp) to avoid blocking (requests is synchronous)
. ?? is this SigRSV? 003bd19d0187117f130b62e1bcab0939929ff5c7709f843c5c4dd158949285d0

Examples:
> http://localhost:8000/api/asset/user/hello
> http://localhost:8000/api/asset/price/cardano
> http://localhost:8000/api/asset/price/sigusd
> http://localhost:8000/api/asset/balance/9iD7JfYYemJgVz7nTGg9gaHuWg7hBbHo2kxrrJawyz4BD1r9fLS
> http://localhost:8000/api/asset/price/history/ergo/3

testnet: 3WwjaerfwDqYvFwvPRVJBJx2iUvCjD2jVpsL82Zho1aaV5R95jsG
mainnet: 9iD7JfYYemJgVz7nTGg9gaHuWg7hBbHo2kxrrJawyz4BD1r9fLS

"""
#endregion BLOCKHEADER


#region ENVIRONMENT
import os
POSTGRES_PORT = os.getenv('POSTGRES_PORT')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASS = 'world' #os.getenv('POSTGRES_PASS')
POSTGRES_DBNM = 'hello' #os.getenv('POSTGRES_DBNM')
#endregion ENVIRONMENT


#region LOGGING
import logging
logging.basicConfig(format="%(asctime)s %(levelname)s %(threadName)s %(name)s %(message)s", datefmt='%m-%d %H:%M', level=logging.DEBUG)
#endregion LOGGING


#region INIT
currency = 'usd' # TODO: store with user
total_sigrsv = 100000000000.01 # initial amount SigRSV
default_rsv_price = 1000000 # lower bound/default SigRSV value
nerg2erg = 1000000000.0 # 1e9 satoshis/kushtis in 1 erg

NETWORK = 'mainnet'
# NETWORK = 'testnet'
ERGO_PLATFORM_URL = { 
    'mainnet': 'https://api.ergoplatform.com/api/v1',
    'testnet': 'https://api-testnet.ergoplatform.com/api/v1'
}
ergo_watch_api: str = 'https://ergo.watch/api/sigmausd/state'
oracle_pool_url: str = 'https://erg-oracle-ergusd.spirepools.com/frontendData'
coingecko_url: str = 'https://api.coingecko.com/api/v3' # coins/markets?vs_currency=usd&ids=bitcoin"

exchange = 'coinex'
symbol = 'ERG/USDT'

con = create_engine(f'postgresql://{POSTGRES_USER}:{POSTGRES_PASS}@postgres:{POSTGRES_PORT}/{POSTGRES_DBNM}')

asset_router = r = APIRouter()
#endregion INIT


#region ROUTES
#
# Single coin balance and tokens for wallet address
#
@r.get("/balance/{address}", name="asset:wallet-balance")
async def get_asset_balance_from_address(address: str = Path(..., min_length=40, regex="^[a-zA-Z0-9_-]+$")) -> None: 

    # get balance from ergo explorer api
    logging.debug(f'find balance for [blockchain], address: {address}...')
    res = requests.get(f'{ERGO_PLATFORM_URL[NETWORK]}/addresses/{address}/balance/total')    

    # handle invalid address or other error
    wallet_assets = {}
    balance = {}
    if res.status_code == 200:
        balance = res.json()
    # else:
        # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong.")
    logging.info(f'Balance for ergo: {balance}')

    ergPrice = (await get_asset_current_price('ERGO'))['price']

    # handle SigUSD and SigRSV
    tokens = []
    for token in balance['confirmed']['tokens']:
        token['price'] = 0.0
        # if token['name'] == 'SigUSD': # TokenId: 22c6cc341518f4971e66bd118d601004053443ed3f91f50632d79936b90712e9
        if token['tokenId'] == '03faf2cb329f2e90d6d23b58d91bbb6c046aa143261cc21f52fbe2824bfcbf04': 
            price = (await get_asset_current_price('SigUSD'))['price'] * ergPrice
            token['price'] = price
        # if token['name'] == 'SigRSV': # TokenId: 003bd19d0187117f130b62e1bcab0939929ff5c7709f843c5c4dd158949285d0
        if token['tokenId'] == '003bd19d0187117f130b62e1bcab0939929ff5c7709f843c5c4dd158949285d0':
            price = (await get_asset_current_price('SigRSV'))['price'] * ergPrice
            token['price'] = price
        tokens.append(token)

    # normalize result
    wallet_assets["ERG"] = {
        "blockchain": "ergo",
        "balance": balance['confirmed']['nanoErgs']/nerg2erg, # satoshis/kushtis
        "unconfirmed": balance['unconfirmed']['nanoErgs']/nerg2erg, # may not be available for all blockchains
        "tokens": tokens, # array
        "price": ergPrice,
    }
    # unconfirmed?

    return {
        "address": address,
        "balance": wallet_assets,
    }

#
# Find price by coin
# - Allow SigUSD/RSV ergo tokens to be listed as coins (TODO: change from ergo.watch api)
# - Allow multiple coins per blockchain (TODO: change from CoinGecko api)
#
@r.get("/price/{coin}", name="coin:coin-price")
async def get_asset_current_price(coin: str = None) -> None:

    price = 0.0 # init/default
    coin = coin.lower()

    # SigUSD/SigRSV
    if coin in ('sigusd', 'sigrsv'):
        res = requests.get(ergo_watch_api).json()
        if res:
            if coin == 'sigusd':
                price = 1/(res['peg_rate_nano']/nerg2erg)
            else:
                circ_sigusd_cents = res['circ_sigusd']/100.0 # given in cents
                peg_rate_nano = res['peg_rate_nano'] # also SigUSD
                reserves = res['reserves'] # total amt in reserves (nanoerg)
                liabilities = min(circ_sigusd_cents * peg_rate_nano, reserves) # lower of reserves or SigUSD*SigUSD_in_circulation
                equity = reserves - liabilities # find equity, at least 0
                if equity < 0: equity = 0
                if res['circ_sigrsv'] <= 1:
                    price = 0
                else:
                    price = equity/res['circ_sigrsv']/nerg2erg # SigRSV

    # ...all other prices
    else:
        price = None

        # first, check local database storage for price
        logging.warning('find price from aggregator...')
        try:            
            sqlFindLatestPrice = f'select close from "{exchange}_{coin}_1m" order by timestamp_utc desc limit 1'
            res = con.execute(sqlFindLatestPrice, con=con)
            price = res.fetchone()[0]
        except:
            pass

        # if not in local database, ask for online value
        if price == None:
            logging.warning('fallback to price from exchange')
            res = requests.get(f'{coingecko_url}/simple/price?vs_currencies={currency}&ids={coin}')

            # handle invalid address or other error
            if res.status_code != 200:
                # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong.")
                price = {}
            else:
                try:
                    price = res.json()[coin][currency] 
                except:
                    pass


    return {
        "price": price
    }


#
# Find price by coin
# - Allow SigUSD/RSV ergo tokens to be listed as coins (TODO: change from ergo.watch api)
# - Allow multiple coins per blockchain (TODO: change from CoinGecko api)
#
@r.get("/price/history/{coin}/{lastNmonths}", name="coin:coin-price-historical")
async def get_asset_historical_price(coin: str = None, lastNmonths: int = None, ) -> None:

    price = 0.0 # init/default
    coin = coin.lower()

    # SigUSD/SigRSV
    if coin in ('sigusd', 'sigrsv'):
        price = {}

    # ...all other prices
    else:
        con = create_engine('postgresql://hello:world@postgres:5432/hello')
        sql = f'''
            select datetime, "openPriceUsd", "closePriceUsd", "highPriceUsd", "lowPriceUsd", volume, marketcap 
            from public.ergo_historical_ohlcv_daily
            where datetime > CURRENT_DATE - INTERVAL '{lastNmonths} months'
        '''
        df = pd.read_sql_query(sql, con=con)
        price = df.to_dict('records')

    return {
        "price": price
    }
#endregion ROUTES

#
# All coin balances and tokens for wallet addresses
# . calls /balance/address
#
from pydantic import BaseModel
class Wallets(BaseModel):
    type: str

# 
# Test with some random wallets: 
# POST with this body
#
# headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
# data = {
#    "ergo" : ["9iD7JfYYemJgVz7nTGg9gaHuWg7hBbHo2kxrrJawyz4BD1r9fLS", "9h3DjWYXLriAn5cox3CeCFGxngTY3JQpy9RwZwP4x1xYAjeSN1G"],
#    "ethereum": ["0x668Cc4E8aEa7E893242cC1d7Ab8109E99f71Cfe1", "0x0FF24158220A14398F047a80a513617Ddc4f5289"]
# }
#
# Python example:
# > res = requests.post('http://localhost:8000/api/asset/balance/all', data=data, headers=headers)
#
@r.post("/balance/all", name="asset:all-wallet-balances")
async def get_all_assets(request: Request) -> None:
    
    wallets = await request.json()

    try:
        # Final balance man contain multiple wallets
        assets = {}

        for wallet in wallets:
            assets[wallet] = []

            # ergo
            if wallet == 'ergo':
                for address in wallets[wallet]:
                    try: assets[wallet].append(await get_asset_balance_from_address(address))
                    except: assets[wallet].append("invalid response")

            # ethereum
            if wallet == 'ethereum':
                for address in wallets[wallet]:
                    try:
                        res = requests.get(f'https://api.ethplorer.io/getAddressInfo/{address}?apiKey=freekey')
                        assets[wallet].append({
                            "address": address,
                            "balance": {
                                'ETH': {
                                    'blockchain': 'ethereum',
                                    'balance': res.json()['ETH']['balance'],
                                    'unconfirmed': 0,
                                    'tokens': None,
                                    'price': (await get_asset_current_price(wallet))['price']
                                }                     
                            }
                        })
                    except: assets[wallet].append("invalid response")

    except Exception as e:
        logging.error(e)

    return assets