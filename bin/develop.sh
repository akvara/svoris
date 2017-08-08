#!/bin/bash
# source bin/env.sh
./bin/init_db.sh
docker-compose -f docker-compose.yml up

# echo Starting development server on :8000
# dcdev up
