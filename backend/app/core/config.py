import os

PROJECT_NAME = "ERGOPAD"
SQLALCHEMY_DATABASE_URI = 'postgresql://hello:world@postgres:5432/hello' # os.getenv("DATABASE_URL")
API_V1_STR = "/api"