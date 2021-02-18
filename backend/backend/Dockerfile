FROM python:3.8
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirementsDjango.txt /code/
COPY wait_for_postgres.sh /code/
COPY start_django.sh /code/


RUN pip install --upgrade pip
RUN pip install --upgrade wheel
RUN pip install --upgrade setuptools
RUN pip install -r requirementsDjango.txt

COPY . /code/

RUN ["chmod", "+x", "wait_for_postgres.sh"]
RUN ["chmod", "+x", "start_django.sh"]