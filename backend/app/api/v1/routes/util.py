# import requests
import ssl
import os
import pandas as pd

from sqlalchemy import create_engine
from fastapi import APIRouter #, Request
from fastapi.encoders import jsonable_encoder
from typing import Optional
from pydantic import BaseModel

from smtplib import SMTP

#region BLOCKHEADER
"""
Utilities
---------
Created: vikingphoenixconsulting@gmail.com
On: 20211129
Purpose: Common support requests

Notes: 
"""
#endregion BLOCKHEADER

#region LOGGING
import logging
logging.basicConfig(format="%(asctime)s %(levelname)s %(threadName)s %(name)s %(message)s", datefmt='%m-%d %H:%M', level=logging.DEBUG)
#endregion LOGGING

# testing
# email = Email(to='erickson.winter@gmail.com', subj='testing', body='hello world 4')
# email(email)
class Email(BaseModel):
    to: str
    # sender: str
    subject: Optional[str] = 'ErgoPad'
    body: Optional[str] = ''

    class Config:
        schema_extra = {
            'to': 'hello@world.com',
            'subject': 'greetings',
            'body': 'this is a message.'
        }

# dat = {'name': 'bob', 'email': 'email', 'qty': 9, 'wallet': '1234', 'handle1': 'h1', 'platform1': 'p1', 'handle2': 'h2', 'platform2': 'p2', 'canInvest': 1, 'hasRisk': 1, 'isIDO': 1}
class Whitelist(BaseModel):
    chatHandle: str
    chatPlatform: str
    email: str
    ergoAddress: str
    name: str
    sigValue: int
    socialHandle: str
    socialPlatform: str

    class Config:
        schema_extra = {
            'to': 'hello@world.com',
            'subject': 'greetings',
            'body': 'this is a message.'
        }

util_router = r = APIRouter()
#endregion INIT

@r.post("/email")
async def email(email: Email):
    usr = os.getenv('EMAIL_ERGOPAD_USERNAME')
    pwd = os.getenv('EMAIL_ERGOPAD_PASSWORD')
    svr = os.getenv('EMAIL_ERGOPAD_SMTP') 
    frm = os.getenv('EMAIL_ERGOPAD_FROM')
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS)

    # create connection
    logging.info(f'creating connection for: {svr} as {usr}')
    con = SMTP(svr, 587)
    res = con.ehlo()
    res = con.starttls(context=ctx)
    if res[0] == 220: logging.info('starttls success')
    else: logging.error(res)
    res = con.ehlo()
    res = con.login(usr, pwd)
    if res[0] == 235: logging.info('login success')
    else: logging.error(res)

    msg = f"""From: {frm}\nTo: {email.to}\nSubject: {email.subject}\n\n{email.body}"""
    res = con.sendmail(frm, email.to, msg) # con.sendmail(frm, 'erickson.winter@gmail.com', msg)
    if res == {}: logging.info('message sent')
    else: logging.error(res)

    return {'status': 'success', 'detail': f'email sent to {email.to}'}

@r.post("/whitelist")
async def email(whitelist: Whitelist):
    usr = os.getenv('EMAIL_ERGOPAD_USERNAME')
    pwd = os.getenv('EMAIL_ERGOPAD_PASSWORD')
    svr = os.getenv('EMAIL_ERGOPAD_SMTP') 
    frm = 'whitelist@ergopad.io'
    to = 'beanbrown@gmail.com'
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS)

    # create connection
    logging.info(f'creating connection for: {svr} as {usr}')
    con = SMTP(svr, 587)
    res = con.ehlo()
    res = con.starttls(context=ctx)
    if res[0] == 220: logging.info('starttls success')
    else: logging.error(res)
    res = con.ehlo()
    res = con.login(usr, pwd)
    if res[0] == 235: logging.info('login success')
    else: logging.error(res)

    msg = f"""From: {frm}\nTo: {to}\nSubject: ERGOPAD WHITELIST\n\n{whitelist}"""
    res = con.sendmail(frm, to, msg) # con.sendmail(frm, 'beanbrown@gmail.com', msg)
    if res == {}: logging.info('message sent')
    else: logging.error(res)

    # save to database
    # con = create_engine('postgresql://frontend:invitetokencornerworld@3.87.194.195/ergopad')
    con = create_engine('postgresql://frontend:invitetokencornerworld@3.87.194.195:5432/ergopad')
    df = pd.DataFrame(jsonable_encoder(whitelist), index=[0])
    df.to_sql('whitelist', con=con, if_exists='append', index=False)

    return {'status': 'success', 'detail': f'email sent to whitelist'}

@r.get("/whitelist")
async def whitelist():
    try:
        con = create_engine('postgresql://frontend:invitetokencornerworld@3.87.194.195:5432/ergopad')
        res = con.execute('select sum("sigValue") as qty from whitelist')

        return {'status': 'success', 'qty': int(res[0]['qty'])}

    except Exception as e:
        return {'status': 'error', 'count': -1, 'desc': e}
    