# svoris

mkdir svoris
cd svoris
mkdir app
mkdir instance
touch manage.py
touch requirements.txt
touch run.py
touch test_svoris.py
touch app/__init__.py
touch instance/__init__.py
touch app/models.py
touch instance/config.py

sudo -u postgres createdb svoris_test_db
sudo -u postgres createdb svoris_api

virtualenv venv
pip install flask flask-sqlalchemy psycopg2 flask-migrate Flask-API

python manage.py db init
python manage.py db migrate
python manage.py db update

flask run
