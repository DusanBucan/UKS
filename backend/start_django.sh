#!/bin/bash


#migration
python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate


#load data
python manage.py loaddata ./label/fixtures/label.json
python manage.py loaddata ./github_user/fixtures/user.json
python manage.py loaddata ./github_user/fixtures/github_user.json
python manage.py loaddata ./project/fixtures/project.json
python manage.py loaddata ./milestone/fixtures/milestone.json
python manage.py loaddata ./task/fixtures/task.json

# start django
python manage.py runserver 0.0.0.0:8000


# gunicorn helloapp.wsgi -b 0.0.0.0:8000