from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
import uvicorn

from api.v1.routes.users import users_router
from api.v1.routes.auth import auth_router
from api.v1.routes.asset import asset_router
from api.v1.routes.blockchain import blockchain_router
from api.v1.routes.util import util_router
from core import config
# from app.db.session import SessionLocal
from core.auth import get_current_active_user
from core.celery_app import celery_app
from worker import tasks


app = FastAPI(
    title=config.PROJECT_NAME, 
    docs_url="/api/docs", 
    openapi_url="/api"
)

# init database?
# app.add_event_handler("startup", tasks.create_start_app_handler(app))
# app.add_event_handler("shutdown", tasks.create_stop_app_handler(app))


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""
@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = SessionLocal()
    response = await call_next(request)
    request.state.db.close()
    return response
"""

@app.get("/api/ping")
async def ping():
    return {"hello": "world"}


@app.get("/login")
async def ping():
    return {"authToken": "helloworld"}


@app.get("/api/task")
async def example_task():
    celery_app.send_task("tasks.example_task", args=["Hello World"])

    return {"message": "success"}


# Routers
app.include_router(users_router, prefix="/api/users", tags=["users"], dependencies=[Depends(get_current_active_user)])
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(asset_router, prefix="/api/asset", tags=["asset"])
app.include_router(blockchain_router, prefix="/api/blockchain", tags=["blockchain"])
app.include_router(util_router, prefix="/api/util", tags=["util"])


### MAIN
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=4000)

