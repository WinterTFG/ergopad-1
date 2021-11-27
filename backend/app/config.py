import os

from types import SimpleNamespace
from base64 import b64encode

class dotdict(SimpleNamespace):
    def __init__(self, dictionary, **kwargs):
        super().__init__(**kwargs)
        for key, value in dictionary.items():
            if isinstance(value, dict):
                self.__setattr__(key, dotdict(value))
            else:
                self.__setattr__(key, value)


import os
POSTGRES_PORT = os.getenv('POSTGRES_PORT')
POSTGRES_USER = os.getenv('POSTGRES_USER')

Network = os.getenv('ERGONODE_NETWORK')
Config = {
  # 'devnet':
  'testnet': dotdict({
    'node'              : 'http://launchpad:9052',
    'explorer'          : 'https://api-testnet.ergoplatform.com/api/v1',
    'ergopadApiKey'     :  os.getenv('ERGOPAD_APIKEY'),
    'bogusApiKey'       :  os.getenv('BOGUS_APIKEY'),
    'assembler'         : 'http://assembler:8080',
    'minTx'             : 10000000, # required
    'txFee'             : 2000000, # tips welcome
    'nanoergsInErg'     : 1000000000, # 1e9
    'nergAmount'        : .1, # default
    'qtyTokens'         : 5, 
    'tokenPriceNergs'   : 1500000000, # 1.5 ergs
    'ergopadTokenId'    : os.getenv('ERGOPAD_TOKENID'),
    'b64ergopadTokenId' : b64encode(bytes.fromhex(os.getenv('ERGOPAD_TOKENID'))).decode(),
    'ergopadWallet'     : os.getenv('ERGOPAD_WALLET'),
    'buyerWallet'       : os.getenv('BOGUS_WALLET'),
    'requestedTokens'   : 4,
    'vestingPeriods'    : 2,
    'wallet'            : 'http://ergonode:9052',
  }),
  'mainnet': dotdict({
    'node'              : 'http://ergonode:9053',
    'explorer'          : 'https://api.ergoplatform.com/api/v1',
    'ergopadApiKey'     :  os.getenv('ERGOPAD_APIKEY'),
    'bogusApiKey'       :  os.getenv('BOGUS_APIKEY'),
    'assembler'         : 'http://assembler:8080',
    'minTx'             : 10000000, # required
    'txFee'             : 2000000, # tips welcome
    'nanoergsInErg'     : 1000000000, # 1e9
    'nergAmount'        : .1, # default
    'qtyTokens'         : 5, 
    'tokenPriceNergs'   : 1500000000, # 1.5 ergs
    'ergopadTokenId'    : os.getenv('ERGOPAD_TOKENID'),
    'b64ergopadTokenId' : b64encode(bytes.fromhex(os.getenv('ERGOPAD_TOKENID'))).decode(),
    'ergopadWallet'     : os.getenv('ERGOPAD_WALLET'),
    'buyerWallet'       : os.getenv('BOGUS_WALLET'),
    'requestedTokens'   : 4,
    'vestingPeriods'    : 2,
    'wallet'            : 'http://ergonode2:9053',
  })
}
