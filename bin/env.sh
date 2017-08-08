export DOCKER_CONFIG_TEST=${DOCKER_CONFIG_TEST:-docker-compose.test.yml}

export DB_NAME=${DB_NAME:-svoris}
export DB_USER=${DB_USER:-svoris}

export DJANGO_SETTINGS_DEV=${DJANGO_SETTINGS_DEV:-conf.settings}
export DJANGO_SETTINGS_TEST=${DJANGO_SETTINGS_TEST:-conf.settings_test}

ENV_FILE="${BASH_SOURCE%/*}/../backend/.env"

# if [ ! -f $ENV_FILE ]; then
    # ENV_FILE="${BASH_SOURCE%/*}/../.env-dev"
# fi
source backend/venv/bin/activate
source $ENV_FILE

dcdev() {
    docker-compose -f docker-compose.yml "$@"
}

dcprod() {

    docker-compose  -f "${DOCKER_CONFIG_PROD:?DOCKER_CONFIG_PROD env var is not set}" "$@"
}

dctest() {
    docker-compose -f docker-compose.yml -f $DOCKER_CONFIG_TEST "$@"
}
