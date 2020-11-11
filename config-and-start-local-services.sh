#!/usr/bin/env bash
function get_vars_env () {
  echo -e "$(grep "$1" .env | cut -d '=' -f2)"
}

function get_vars_app_config () {
  echo -e "$(grep "$1" ./config/config.ts | cut -d ':' -f2- | tr -d "/'" | sed 's/,*$//g')"
}

TOPICS=$(get_vars_app_config createTopics)
DOCKER_KAFKA_HOST=$(get_vars_env DOCKER_KAFKA_HOST)
HOST_KAFKA_PORT=$(get_vars_env HOST_KAFKA_PORT)
DOCKER_KAFKA_PORT=$(get_vars_env DOCKER_KAFKA_PORT)
DOCKER_KAFKA_PORTS="$DOCKER_KAFKA_PORT:$HOST_KAFKA_PORT"
HOST_ZOOKEEPER_PORT=$(get_vars_env HOST_ZOOKEEPER_PORT)
DOCKER_ZOOKEEPER_PORT=$(get_vars_env DOCKER_ZOOKEEPER_PORT)
ZOOKEEPER_PORTS=$DOCKER_ZOOKEEPER_PORT:$HOST_ZOOKEEPER_PORT
HOST_REDIS_PORT=$(get_vars_env HOST_REDIS_PORT)
DOCKER_REDIS_PORT=$(get_vars_env DOCKER_REDIS_PORT)
REDIS_PORTS=$DOCKER_REDIS_PORT:$HOST_REDIS_PORT
REDIS_REPLICATION_MODE=$(get_vars_env REDIS_REPLICATION_MODE)
export DOCKER_KAFKA_HOST=$DOCKER_KAFKA_HOST TOPICS=$TOPICS DOCKER_KAFKA_PORTS=$DOCKER_KAFKA_PORTS ZOOKEEPER_PORTS=$ZOOKEEPER_PORTS REDIS_PORTS=$REDIS_PORTS REDIS_REPLICATION_MODE=$REDIS_REPLICATION_MODE

npm run build-front && npm run build-back && docker-compose up
