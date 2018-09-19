#!/bin/bash
./bin/install.sh
python manage.py db migrate
python manage.py db upgrade
#python manage.py test
python run.py