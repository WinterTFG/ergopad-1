import requests, json

from address import Address
from time import sleep

### LOGGING
import logging
level = logging.DEBUG # TODO: set from .env
logging.basicConfig(format="%(asctime)s %(levelname)s %(threadName)s %(name)s %(message)s", datefmt='%m-%d %H:%M', level=level)

### INIT 
headers = {'Content-Type': 'application/json'}

assembler_url = 'http://assembler:8080' 
owner         = '3WwjaerfwDqYvFwvPRVJBJx2iUvCjD2jVpsL82Zho1aaV5R95jsG' 
ergopad       = '3WwjaerfwDqYvFwvPRVJBJx2iUvCjD2jVpsL82Zho1aaV5R95jsG' # find ergopad tokens and configNFT here

tokenName          = 'helloworld' # 'ergopad'
minErg             = 100000 # 1e5
nanoergsInErg      = 1000000000
auctionFee         = 0.1 * nanoergsInErg # 1e8 satoshis

# need to find in wallet
# configNFTAmount    = 1 
# serviceTokenAmount = 2000 

# configNFT and token Ids
ergopadNFTId   = '0x1234'
ergopadTokenId = '0x1234'

# ergoscript
ergopadScript = f"""
  {{
    // INIT
    val configBox      = CONTEXT.dataInputs(0)
    val validConfigBox = configBox.tokens(0)._1 == ${ergopadNFTId}
    val defined        = (OUTPUTS(0).tokens.size > 0 && OUTPUTS(0).R4[Coll[Byte]].isDefined)

    // Check dataInput for ConfigNFT, and also make sure output has token(s) and R4 exists
    if (validConfigBox && defined) {{
      val ownerScript         = configBox.R4[SigmaProp].get
      val priceOfServiceToken = configBox.R5[Long].get
      
      // validate tokens are available
      sigmaProp (
        if (defined) {{
          val inServiceToken  = SELF.tokens(0)
          val outServiceToken = OUTPUTS(0).tokens(0)
          val outValue: Long  = ((inServiceToken._2 - outServiceToken._2) * priceOfServiceToken).toLong // how many tokens available?
          allOf( 
            Coll(
              inServiceToken._1             == ${ergopadTokenId},
              outServiceToken._1            == ${ergopadTokenId},
              OUTPUTS(0).propositionBytes   == SELF.propositionBytes,
              OUTPUTS(0).R4[Coll[Byte]].get == SELF.id,
              OUTPUTS(1).value              >= outValue,
              OUTPUTS(1).propositionBytes   == ownerScript.propBytes
            )
          )
        }} 

        // either not enough tokens available or...
        else {{ false }} 
      )
    }}
    
    // no tokens, return ??
    else if (validConfigBox) [{{
      val ownerScript = configBox.R4[SigmaProp].get
      ownerScript
    }}
    
    // fail on no tokens or invalid configNFT
    else {{ sigmaProp (false) }}
  }}
"""

## CLASSES
class dotdict(dict):
    def __getattr__(self, name):
        return self[name]

async def follow():
    await requests.get(assembler_url)
    return 0

### MAIN
f = dotdict({
    'address': 123,
    'returnTo': 234,
    'erg': 10,
    'reqValue': 0,
    'reqAddress': 345,
    'registers': [],
    'fee': 100,    
    'inputs': [],
    'dataInputs': [],
})

reqFollow = {
    'address': f.address,
    'returnTo': f.returnTo,
    'startWhen': {
        'erg': f.erg,
    },
    'txSpec': {
        'requests': [{
            'value': f.reqValue,
            'address': f.reqAddress,
            'registers': f.regiesters,
        }],
        'fee': f.fee,
        'inputs': [f.inputs],
        'dataInputs': [f.dataInputs],
    },
}

res = follow(reqFollow)

