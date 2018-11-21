#!/bin/bash
# start-prod-app.sh - script run at startup of container in production image only
# will run db-migrate before starting app (npm run start)

DB_HOST=$RDS_HOSTNAME

# $1 is DATABASE_MIGRATIONS from scripts/staging.sh or scripts/deploy.sh
# $2 is DATABASE_SCOPES from scripts/staging.sh or scripts/deplot.sh
# both these variables are inserted into Docker image at build time, then passed here as arguments at startup of container
(./scripts/postgres-db/run-migrate.sh "$DB_HOST" "$1" start "$2")
db_migrate_finished=$?

if [[ $db_migrate_finished -eq 0 ]]; then
    echo 'db-migrate finsihed successfully'
    echo 'starting application... npm run start'
else
    echo 'db-migrate failed with exit code: ' $db_migrate_finished
    # if you want deployment to fail if db-migrate fails - uncomment next line
    # exit $db_migrate_finished
fi

(npm start)
