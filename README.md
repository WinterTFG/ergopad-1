# Ergopad
Set of docker containers combined to create a React/MaterialUI frontend, REST API backend, assembler to interact with smart contracts and supporting services like ergonode, redis and postgres.<br>
<br>
Currently, worker (celery) is disabled (intended to automate the aggregator eventually).  Flower and PGAdmin are used mainly for dev to explore postgres and celery.

# Quick Start
If docker and docker-compose v2 are setup, then:<br>
`docker compose up -d`<br>
- Services should be available on the ports below.
- Front-end may need attention as it tends to run outside docker (can cd to frontend and `yarn dev` to run in OS and not in docker; may need to install node/npm/yarn/next/etc..)
<br>
Verify
> ergonode - http://localhost:9053/panel/ (api key in assembler config)<br>
> pgadmin - http://localhost:5050/ (check on postegres)<br>
> flower - http://localhost:5555/ (check on celery)<br>
> assembler - http://localhost:8080/state (check logs to verify running)<br>
> backend - http://localhost:8000/api/ping (hello: world)<br>
> frontend - http://localhost:3000/dashboard (will take time to compile next/ts)<br>

_Note: The first time ergonode is setup, it will need to sync the network, which can take at least a few hours (depending on system), and this can be seen in the ergonode:9053/panel screen._

## Common troubleshooting steps:<br>
To see what's going on inside container, can use docker GUI if have one, or:<br>
`docker logs <service> -n 50 -f`<br>
<br>
To stop, start or restart a service:<br>
`docker compose <stop/start/restart> <service>`<br>
_Note: compose is optional here, but useful sometimes_<br>
<br>
To see what's going on inside a service:<br>
`docker exec -it <service> bash`<br>
_Note: bash is the commend to run inside the container.  This is a common shell, but may also use `sh, csh, etc..`_

## Docker Hints
1. In root, run `docker-compose up --build` to initiate backend
2. Run `docker ps` to get the container ID of the "dashboard-project_server" container, and copy it
3. Run `docker exec -it {CONTAINER ID} bash` to open a bash terminal to that docker container
4. In that terminal, type `alembic upgrade head` to migrate the database. 
5. Navigate to `http://localhost:8000/docs` and test the various endpoints to ensure the backend is up and running

## Frontent Hints
Now, to initiate frontend, you need to have NPM installed in your dev enviroment. 
1. Navigate to `frontend` directory. 
2. Use `npm install` to set up
3. Install yarn if you don't already have it with `npm install -g yarn`
4. Run `yarn dev` to initiate the dev server
5. Browse to `htttp://localhost:3000` to check that the server is up and running. 

# Development
You can now change anything in the frontend folder and it will automatically refresh the website for you. 

To make changes to backend, it's a good idea to reset the docker with `ctrl-C` if you're following the docker logs, or `docker-compose stop` in a fresh terminal. Then run `docker-compose up` to start it again. 

If `alembic upgrade head` doesnt work, or you just need a fresh database, run `docker-compose down`

# TODO
NGINX is setup and should really be the only container accessed from the outside world.  This document is intended more for development, not production.<br>
<br>
There are comments in some places with tag, `TODO:` that indicate work may be incomplete.<br>
<br>

# Support

## Tokens/ERGs
Mint new tokens on mainnet: https://ergoutils.org/#/token
Send ERG in testnet or tokens in mainnet to wallet: https://testnet.ergofaucet.org/
## .ENV
example .env:
```
#######################
# Ports
# =====
# 3000 - frontend
# 5000 - aggregator
# 5050 - pgadmin
# 5432 - postgres
# 5555 - flower
# 6379 - redis
# 8000 - backend
# 8080 - assembler
# 8888 - nginx
# 9053 - ergonode
#######################

# fastapi- REST API interface to application 
BACKEND_PORT=8000
SECRET_KEY=whispers

# node/react- web interface
FRONTEND_PORT=3000
API_URL=http://localhost:8000/api/

# redis
REDIS_PORT=6379

# aggregator
POWERNAP=90 # seconds

# postgres- sql server
POSTGRES_PORT=5432
POSTGRES_USER=hello
POSTGRES_PASSWORD=<password>
POSTGRES_DBNM=hello
PGDATA=/var/lib/postgresql/data/pgdata

# pgadmin- sql client
PGADMIN_LISTEN_PORT=5050
PGADMIN_DEFAULT_EMAIL=hello@world.com
PGADMIN_DEFAULT_PASSWORD=<password>

# flower- celery monitor
FLOWER_PORT=5555

# nginx- reverse proxt
NGINX_PORT=8888

# fastapi- imports crypto OHLCV data to sql server
AGGREGATOR_PORT=5000

# ergo
# .. testnet
ERGONODE_NETWORK=testnet
ERGONODE_HOST=ergonode
ERGONODE_PORT=9052
ERGO_API_KEY=<apikey>
ERGOPAD_TOKENID=<tokenid>
ERGOPAD_APIKEY=<apikey>
ERGOPAD_WALLET=<wallet>
BOGUS_APIKEY=<apikey>
BOGUS_WALLET=<wallet>
# .. mainnet
# ERGONODE_NETWORK=mainnet
# ERGONODE_HOST=ergonode
# ERGONODE_PORT=9053
# ERGO_API_KEY=<apikey>

# assembler
ASSEMBLER_PORT=8080
```
