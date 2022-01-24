#!/usr/bin/env bash

# these services should  each have a `*-migrations` docker-compose entry
SERVICES='sarge_api'

for DOCKER_COMPOSE_SERVICE in $SERVICES; do
  docker-compose run --rm "$DOCKER_COMPOSE_SERVICE" yarn migrate:latest
  docker-compose run --rm "$DOCKER_COMPOSE_SERVICE" yarn seed
done