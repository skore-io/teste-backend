# SKORE CHALLENGE

## Scripts

There is a few scripts to test, run and manage the application through containers.

- `make start`: Starts the application according through the docker-compose file.
- `make status`: To see all running containers status.
- `make logs`: Tails the logs.
- `make stop`: Stops all running containers.
- `make clean`: Stops all running containers, if they are not stoped already, then purge all volumes, networks and containers.
- `make test`: Runs all tests containerized.
- `make build`: Builds the application container.
