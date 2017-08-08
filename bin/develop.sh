#!/bin/bash
source bin/env.sh
./bin/init_db.sh


# echo Starting development server on :8000
dcdev up
