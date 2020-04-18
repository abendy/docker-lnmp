# Helpful commands

## Connect to app volume (Docker)

```sh
docker exec -it lnmp-php /bin/bash
```

## Quit (Docker)

```sh
docker-compose down \
  && test -z "$(docker ps -q 2>/dev/null)" && osascript -e 'quit app "Docker"'
```

## Dump database (Docker)

```sh
docker exec -it hypr-php /bin/bash -c 'mysqldump --opt --routines --triggers -u `wp dotenv get DB_USER` -p`wp dotenv get DB_PASSWORD` -h `wp dotenv get DB_HOST | sed -E "s/^([^\:]+).+/\1/g"` `wp dotenv get DB_NAME` | tee >(gzip -9 -c > ./database/localhost_backups/`wp dotenv get DB_NAME`--`date +\%Y\%m\%d_\%H\%M\%S`.sql.gz) &>/dev/null'
```

## Rename database suffixed with timestamp (Docker)

```sh
docker exec -it hypr-php /bin/bash -c './scripts/mysql/rename'
```

## Clear Redis cache (Docker)

```sh
docker exec -it hypr-redis /bin/sh -c 'redis-cli flushall'
```

## Clear Redis cache (Pantheon)

Replace `<ENV>` with `dev`, `test` or `live`.

```sh
eval $(terminus connection:info --field='Redis Command' hypr-corp.<ENV>) flushall
```

## Restart PHP-FPM (Docker)

```sh
docker exec -it hypr-php /bin/bash -c 'kill -USR2 1'
```

## Wipe app volume and recreate (Docker)

```sh
docker volume rm -f app_data redis_data \
  && docker volume create --name=app_data
```
