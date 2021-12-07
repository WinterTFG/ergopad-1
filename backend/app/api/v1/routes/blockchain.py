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
@r.get("/nodeInfo", name="blockchain:nodeInfo")
def getNodeInfo():
  try:
    nodeInfo = {}
    
    res = requests.get(f'{CFG.node}/info', headers=dict(headers, **{'api_key': CFG.ergopadApiKey}))
    if res.ok:
      info = res.json()
      nodeInfo['network'] = Network
      nodeInfo['uri'] = CFG.node
      if 'parameters' in info:
        if 'height' in info['parameters']:
          nodeInfo['currentHeight'] = info['parameters']['height']
      if 'currentTime' in info:
        nodeInfo['currentTime'] = info['currentTime']
    
    return nodeInfo

  except Exception as e:
    logging.error(f'getBoxesWithUnspentTokens {e}')
    return None

@r.get("/tokenInfo/{tokenId}", name="blockchain:tokenInfo")
def getTokenInfo(tokenId):
  # tkn = requests.get(f'{CFG.node}/wallet/balances/withUnconfirmed', headers=dict(headers, **{'api_key': CFG.apiKey})
  try:
    tkn = requests.get(f'{CFG.explorer}/tokens/{tokenId}')
    return tkn.json()
  except Exception as e:
    return {'status': 'error', 'details': f'{CFG.explorer}/tokens/{tokenId}', 'exception': e}

@r.get("/followInfo/{tokenId}", name="blockchain:followinfo")
def followInfo(followId):    
    try:
        res = f'http://localhost:8080/result/{followId}'
        return res.json()
    
    except Exception as e:
        return {'status': 'fail', 'details': e}    

# find unspent boxes with tokens
@r.get("/unspentTokens", name="blockchain:unspentTokens")
def getBoxesWithUnspentTokens(tokenId=CFG.ergopadTokenId, allowMempool=True):
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

      ergopadTokenId = '123abc'
      htLockScript = [] # compile height lockscript
      numVestingPeriods = 6
      for i in range(numVestingPeriods):
          htLockScript.append(f'qwerty{i}') # call script function with input as height to lock at

      return f"""{{
        // val prefixes, use: in, out, self and ctx

        // init with basic structure:
        // 1. 1x input with correct ergs, equal to ergoPadTokens*pricePerToken + minFee*vestingPeriods (+ serviceFee?)
        // 2. Vx output with correct number of ergoPadTokens, V=num vesting periods
        // 3. The final vesting period will handle any leftover tokens (i.e. 7 tokens for 6 vesting periods, last period will contain 2)
        // 4. each output will contain protection script to lock tokens until HEIGHT + vestingDuration*vestingPeriod (i.e. 100,000 + 100*6 for vesting period 6 and 100 blocks duration)
        val defined = OUTPUTS(0).R4[Coll[Byte]].isDefined

        // structure ok, check logic and return t/f as sigmaProp
        sigmaProp( 
          if (defined) {{

            val inErgopadToken = SELF.tokens(0)
            // val ctxHeight = HEIGHT
            val outErgopadToken0 = OUTPUTS(0).tokens(0)_1
            val outErgopadToken1 = OUTPUTS(1).tokens(0)_1
            val outErgopadToken2 = OUTPUTS(2).tokens(0)_1
            val outErgopadToken3 = OUTPUTS(3).tokens(0)_1
            val outErgopadToken4 = OUTPUTS(4).tokens(0)_1
            val outErgopadToken5 = OUTPUTS(5).tokens(0)_1
            val outBoxCount = OUTPUTS.size // one output box per vesting period

            // this will evaluate to true or false
            allOf(Coll(
              outBoxCount = {numVestingPeriods}L,              
              inErgopadToken = {ergopadTokenId},
              outErgopadToken0 = {ergopadTokenId},
              outErgopadToken1 = {ergopadTokenId},
              outErgopadToken2 = {ergopadTokenId},
              outErgopadToken3 = {ergopadTokenId},
              outErgopadToken4 = {ergopadTokenId},
              outErgopadToken5 = {ergopadTokenId},
              outHtLockScript0 = {htLockScript[0]},
              outHtLockScript1 = {htLockScript[1]},
              outHtLockScript2 = {htLockScript[2]},
              outHtLockScript3 = {htLockScript[3]},
              outHtLockScript4 = {htLockScript[4]},
              outHtLockScript5 = {htLockScript[5]},
            ))
          }}

          // structure incorrect
          else {{
            false
          }} 
        ) // sigmaProp
      }}"""

    if name == 'testing':
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
    smartContract = getErgoscript('alwaysTrue')
    txFee = CFG.txFee # * CFG.vestingPeriods ??
    txMin = 100000 # .01 ergs; remove after reload ENV
    txTotal = txMin * CFG.vestingPeriods # without fee

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
        'script': scVesting,
        'value': txMin,
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
            'erg': txFee + txTotal, # nergAmount + 2*minTx + txFee
        },
        'txSpec': {
            'requests': outBox,
            'fee': txFee,          
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
    return({
        'status': 'success', 
        'details': f'send {txTotal/CFG.nanoergsInErg} total ergs, and {txFee/CFG.nanoergsInErg} fee ergs to {smartContract}',
        'fin': fin.json(), 
        'smartContract': smartContract, 
        'followId': id, 
        'request': request
    })
  
  except Exception as e:
    logging.error(f'purchaseToken: {e}')
    return({'status': 'fail', 'id': -1, 'tokenId': tokenId, 'description': e})

@r.get("/sendPayment/{address}/{nergs}", name="blockchain:sendpayment")
def sendPayment(address, nergs):
  # TODO: require login/password or something; disable in PROD
  try:
    sendMe = ''
    # !! add in check for wallet lock, and unlock/relock if needed
    lck = requests.get(f'http://ergonode2:9052/wallet/status', headers={'Content-Type': 'application/json', 'api_key': 'goalspentchillyamber'})
    logging.info(lck.content)
    if lck.ok:
        if lck.json()['isUnlocked'] == False:
            ulk = requests.post(f'http://ergonode2:9052/wallet/unlock', headers={'Content-Type': 'application/json', 'api_key': 'goalspentchillyamber'}, json={'pass': 'crowdvacationancientamber'})
            logging.info(ulk.content)
            if ulk.ok:
                isWalletLocked = False
            else:
                isWalletLocked = True
        else:
            isWalletLocked = True
    else:
        isWalletLocked = True

    # unlock wallet
    if isWalletLocked:
        logging.info('unlock wallet')

    # send nergs to address/smartContract from the buyer wallet
    # for testing, address/smartContract is 1==1, which anyone could fulfill
    sendMe = [{
        'address': address,
        'value': int(nergs),
        'assets': [],
    }]    
    # pay = requests.post(f'{CFG.buyer}/wallet/payment/send', headers={'Content-Type': 'application/json', 'api_key': CFG.buyerApiKey}, json=sendMe)
    pay = requests.post(f'http://ergonode2:9052/wallet/payment/send', headers={'Content-Type': 'application/json', 'api_key': 'goalspentchillyamber'}, json=sendMe)

    # relock wallet
    if not isWalletLocked:
        logging.info('relock wallet')

    return {'status': 'success', 'detail': f'payment: {pay.json()}'}

  except Exception as e:
    return {'status': 'fail', 'detail': f'sendPayment\n{sendMe}', 'exception': e}    
