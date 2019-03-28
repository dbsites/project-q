#!/bin/bash
# run-migrate.sh - this file runs all the database migrations using db-migrate

# wait for database to be ready
# $1 is HOST from docker-compose
(./scripts/postgres-db/wait-for-postgres.sh -h "$1" -p 5432)
postgres_running=$?

sleep 2
echo -e '\033[00;95m starting db_migrate \033[0m'

# $1 is HOST from docker-compose
DB_CONFIG=$1

# $3 is npm script provided from docker-compose
if [[ $3 = "start" ]]; then
    # This will only be 'start' in production, so use 'rds' config from database.json
    # otherwise DB_CONFIG will be the database HOST name from docker-compose files, in development.
    DB_CONFIG="rds"
fi

if [[ $postgres_running -eq 0 ]]; then
    # $2 is DATABASE_MIGRATIONS from docker-compose
    if [[ "$2" = 0 ]]; then
        (db-migrate up -e "$DB_CONFIG")
        db_migrate_finished=$?
    else
        (db-migrate up -c "$2" -e "$DB_CONFIG")
        db_migrate_finished=$?
    fi

else
    echo 'db-migrate failed (postgres not running) exit code: ' $postgres_running
    exit $postgres_running
fi

if [[ $db_migrate_finished -eq 0 ]]; then

    echo -e '\033[00;95m loading scopes... \033[0m'
    # $4 list of db-migrate scopes to run against database  - in testing environment this will be DATABASE_TEST_SCOPES
    OIFS=$IFS
    IFS=','
    scopes=$4
    for scope in $scopes
    do
        echo "scope: " "$scope"
        (db-migrate up:"$scope" -e "$DB_CONFIG")
    done
    # reset IFS to old OIFS
    IFS=$OIFS
else
    echo 'db-migrate failed with exit code: ' $db_migrate_finished
    exit $db_migrate_finished
fi

if [[ $3 != "start" ]]; then
    # $3 is npm script provided from docker-compose
    # in production npm run start gets called from start-prod-app.sh
    (npm run "$3")
fi

