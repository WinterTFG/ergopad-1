import requests 

from fastapi import APIRouter, Request
from typing import Optional
from pydantic import BaseModel

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

class Email(BaseModel):
    to: str
    # sender: str
    subj: str
    body: Optional[str] = '[no body]'

util_router = r = APIRouter()
#endregion INIT

@r.post("/email")
async def email(email: Email):
    return email
