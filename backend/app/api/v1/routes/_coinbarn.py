###
### DO NOT USE
###
import requests 
import pandas as pd
# import json

from sqlalchemy import create_engine
from fastapi import APIRouter
from fastapi import Path
from fastapi import Request
from address import Address

coinbarn_router = r = APIRouter()

@r.get("/coinbarn/{address}", name="coinbarn:address")
async def get_coinbarn_address(wallet: str) -> None:
    
    address = Address(wallet)
    res = {
        "address": address.address,
        "isValid": address.isValid
    }
    
    return res
