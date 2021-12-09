# import requests
import ssl
import os

from fastapi import APIRouter #, Request
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
