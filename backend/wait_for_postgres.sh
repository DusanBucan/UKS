#!/bin/bash

# wait for Postgres to start
function postgres_ready() {
    python << END
import sys
import psycopg2
try:
    conn = psycopg2.connect(dbname="gihub_uks", user="gihub_uks", password="gihub_uks", host="localhost")
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)
END
}

until postgres_ready; do
    >&2 echo "Postgres is unavailable - sleeping"
    sleep 1
done

# Start app
>&2 echo "Postgres is up - executing command"

./start_django.sh