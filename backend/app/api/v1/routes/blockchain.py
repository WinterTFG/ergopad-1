import requests 
from wallet import Wallet
from config import Config, Network

from fastapi import APIRouter
from fastapi import Path
from fastapi import Request

#region BLOCKHEADER
"""
Blockchain API
---------
Created: vikingphoenixconsulting@gmail.com
On: 20211009
Purpose: Returns coin and token values by user, coin or wallet.

Notes: 
"""
#endregion BLOCKHEADER

#region LOGGING
import logging
logging.basicConfig(format="%(asctime)s %(levelname)s %(threadName)s %(name)s %(message)s", datefmt='%m-%d %H:%M', level=logging.DEBUG)
#endregion LOGGING

try:
  CFG = Config[Network]
  isSimulation = True
  headers = {'Content-Type': 'application/json'}
  tokenInfo = requests.get(f'{CFG.explorer}/tokens/{CFG.ergopadTokenId}')
  nodeWallet  = Wallet(CFG.ergopadWallet) # contains tokens
  buyerWallet  = Wallet(CFG.buyerWallet) # simulate buyer

except Exception as e:
  logging.error(f'Init {e}')

blockchain_router = r = APIRouter()
#endregion INIT

#region ROUTES
#
# current node info
#
@r.get("/nodeinfo", name="blockchain:nodeinfo")
def getNodeInfo():
  try:
    nodeInfo = {}
    
    res = requests.get(f'{CFG.node}/info', headers=dict(headers, **{'api_key': CFG.ergopadApiKey}))
    if res.ok:
      info = res.json()
      nodeInfo['network'] = Network
      if 'parameters' in info:
        if 'height' in info['parameters']:
          nodeInfo['currentHeight'] = info['parameters']['height']
      if 'currentTime' in info:
        nodeInfo['currentTime'] = info['currentTime']
    
    return nodeInfo

  except Exception as e:
    logging.error(f'getBoxesWithUnspentTokens {e}')
    return None

@r.get("/tokeninfo/{tokenId}", name="blockchain:tokeninfo")
def getTokenInfo(tokenId):
  # tkn = requests.get(f'{CFG.node}/wallet/balances/withUnconfirmed', headers=dict(headers, **{'api_key': CFG.apiKey})
  try:
    tkn = requests.get(f'{CFG.explorer}/tokens/{tokenId}')
    return tkn.json()
  except Exception as e:
    return {'status': 'error', 'details': f'{CFG.explorer}/tokens/{tokenId}', 'exception': e}

# find unspent boxes with tokens
@r.get("/unspentTokens", name="blockchain:unspentTokens")
def getBoxesWithUnspentTokens(tokenId=CFG.ergopadTokenId, allowMempool=False):
  try:
    tot = 0
    ergopadTokenBoxes = {}    

    res = requests.get(f'{CFG.node}/wallet/boxes/unspent?minInclusionHeight=0&minConfirmations={(0, -1)[allowMempool]}', headers=dict(headers, **{'api_key': CFG.ergopadApiKey}))
    if res.ok:
      assets = res.json()
      for ast in assets:
        if 'box' in ast:
          if ast['box']['assets'] != []:
            for tkn in ast['box']['assets']:              
              if 'tokenId' in tkn and 'amount' in tkn:
                logging.info(tokenId)
                if tkn['tokenId'] == tokenId:                  
                  tot += tkn['amount']
                  if ast['box']['boxId'] in ergopadTokenBoxes:
                    ergopadTokenBoxes[ast['box']['boxId']].append(tkn)
                  else:
                    ergopadTokenBoxes[ast['box']['boxId']] = [tkn]
                  logging.debug(tkn)

      logging.info(f'found {tot} ergopad tokens in wallet')

    # invalid wallet, no unspent boxes, etc..
    else:
      logging.error('unable to find unspent boxes')

    # return CFG.node
    return ergopadTokenBoxes

  except Exception as e:
    logging.error(f'getBoxesWithUnspentTokens {e}')
    return({'status': 'fail', 'tokenId': tokenId, 'description': e})

# ergoscript
@r.get("/script/{name}", name="blockchain:script")
def getErgoscript(name, params={}):
  try:
    if name == 'alwaysTrue':
      script = "{ 1 == 1 }"

    if name == 'neverTrue':
      script = "{ 1 == 0 }"

    if name == 'ergopad':
      return f"""
        {{
          val isAvailable = {{
            val tokens = OUTPUTS(0).tokens.getOrElse(0, (INPUTS(0).id, 0L))
            
            // evaluate
            tokens._1 == INPUTS(0).id &&                                   // tokenId requested is available
            tokens._1 == fromBase64("{CFG.b64ergopadTokenId}") &&              // tokenId requested is specifically this token
            tokens._2 == {CFG.qtyTokens}L &&                                   // token qty requested
            OUTPUTS(0).value == {CFG.nergAmount * CFG.tokenPriceNergs + CFG.minTx}L && // token cost
            OUTPUTS(0).propositionBytes == fromBase64("{CFG.buyerTree}")       // expecting this buyer for this amount
          }}

          val returnFunds = {{
            val total = INPUTS.fold(0L, {{(x:Long, b:Box) => x + b.value}}) - 4000000
            
            // evaluate
            OUTPUTS(0).value >= total && 
            OUTPUTS(0).propositionBytes == fromBase64("{CFG.nodeTree}")
          }}

          // 2 outputs? and either tx matches or funds returned
          sigmaProp(OUTPUTS.size == 2 && (isAvailable || returnFunds))
        }}"""

    if name == 'timeLock':
      script = f"""sigmaProp(OUTPUTS(0).R4[Long].getOrElse(0L) >= {params['timeLock']})"""

    if name == 'heightLock':
      script = f"""sigmaProp(OUTPUTS(0).R4[Long].getOrElse(0L) >= {params['heightLock']})"""

    # get the P2S address (basically a hash of the script??)
    p2s = requests.post(f'{CFG.assembler}/compile', headers=headers, json=script)
    smartContract = p2s.json()['address']
    logging.info(f'smart contract: {smartContract}')

    return smartContract
  
  except Exception as e:
    logging.error(f'getErgoscript {e}')
    return None

# smartcontract- height lock
@r.get("/purchase/{qty}", name="blockchain:purchase")
def purchaseToken(qty:int=-1, tokenId=CFG.ergopadTokenId, scScript='alwaysTrue'):

  try:
    nodeInfo = getNodeInfo()  
    ergopadTokenBoxes = getBoxesWithUnspentTokens(tokenId)
    avgBlockHeight_s = 128 # seconds
    vestingEpoch_hr = .1 # hour(s); every 6 mins
    vestingInterval_ht = int(vestingEpoch_hr*(3600/avgBlockHeight_s))
    vestingBeginHeight = nodeInfo['currentHeight']+vestingInterval_ht # vesting period converted to height
    # smartContract = getErgoscript('alwaysTrue')
    smartContract = getErgoscript('heightLock', params={'heightLock': vestingBeginHeight})

    # 1 outbox per vesting period to lock spending until vesting complete
    outBox = []
    logging.info(f'vesting periods: {CFG.vestingPeriods}')
    for i in range(CFG.vestingPeriods):
      
      # in event the requested tokens do not divide evenly by vesting period, add remaining to final output
      remainder = 0
      logging.info(remainder)
      if i == CFG.vestingPeriods-1:
        remainder = qty%CFG.vestingPeriods
      scVesting = getErgoscript('heightLock', {'heightLock': vestingBeginHeight+i*vestingInterval_ht})

      # create outputs for each vesting period; add remainder to final output, if exists
      outBox.append({
        'address': buyerWallet.address,
        'value': CFG.minTx,
        'script': scVesting,
        'register': {
          'R4': vestingBeginHeight+i*vestingInterval_ht, # heightlock
        },
        'assets': [{ 
          'tokenId': tokenId,
          'amount': int(qty/CFG.vestingPeriods + remainder)
        }]
      })

    # create transaction with smartcontract, into outbox(es), using tokens from ergopad token box
    logging.info(f'build request')
    request = {
        'address': smartContract,
        'returnTo': buyerWallet.address,
        'startWhen': {
            'erg': CFG.txFee + CFG.minTx*CFG.vestingPeriods, # nergAmount + 2*minTx + txFee
        },
        'txSpec': {
            'requests': outBox,
            'fee': CFG.txFee,          
            'inputs': ['$userIns', ','.join([k for k in ergopadTokenBoxes.keys()])], # 'inputs': ['$userIns', '488a6f4cddb8d4565f5eddf065e943765539b5e861df160ab47e8692637a4a4e'],
            'dataInputs': [],
        },
    }

    # return({'status': 'testing', 'x': vestingBeginHeight, 'smartContract': smartContract, 'request': request})

    # make async request to assembler
    # logging.info(request); exit(); # !! testing
    res = requests.post(f'{CFG.assembler}/follow', headers=headers, json=request)
    id = res.json()['id']
    fin = requests.get(f'{CFG.assembler}/result/{id}')
    logging.info({'status': 'success', 'fin': fin.json(), 'followId': id, 'request': request})
    return({'status': 'success', 'fin': fin.json(), 'smartContract': smartContract, 'followId': id, 'request': request})
  
  except Exception as e:
    logging.error(f'scHeightLock: {e}')
    return({'status': 'fail', 'id': -1, 'tokenId': tokenId, 'description': e})

