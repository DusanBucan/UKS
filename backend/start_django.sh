#!/bin/bash


#migration
python manage.py makemigrations
python manage.py migrate


#load data
python manage.py loaddata ./label/fixtures/label.json
python manage.py loaddata ./github_user/fixtures/user.json
python manage.py loaddata ./github_user/fixtures/github_user.json
python manage.py loaddata ./project/fixtures/project.json
python manage.py loaddata ./milestone/fixtures/milestone.json
python manage.py loaddata ./task/fixtures/task.json
python manage.py loaddata ./team/fixtures/team.json
python manage.py loaddata ./commit/fixtures/commit.json
python manage.py loaddata ./wiki/fixtures/wiki.json

# start django
python manage.py runserver 0.0.0.0:8000
