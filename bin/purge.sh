#!/bin/bash

# Purges all docker resources, helpful for when you add a new dependancy

docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi $(docker images -aq)
docker system prune --volumes
