# Developer onboarding

## Clone your new repository

```sh
git clone git@github.com:<YOU>/docker-lnmp.git

cd docker-lnmp
```

## Install WordPress and dependencies

```sh
composer install
```

## Create Docker volume for the app to reside in

```sh
docker volume create --name=lnmp_app_data
```

## Start Docker

```sh
open --background -a Docker \
  && while ! docker system info > /dev/null 2>&1; do sleep 1; done \
  && docker-compose up -d
```

## Download latest backup of database

See `Helpful commands` below for more helpful database commands.

```sh
terminus backup:create --element=db hypr-corp.live

cd ./database/live_backups/ && { curl -sS -N $(terminus backup:get --element=db hypr-corp.live) -o $(terminus backup:info --element=db --field=Filename hypr-corp.live) &>/dev/null; cd - &>/dev/null }

docker exec -it hypr-php /bin/bash -c 'gunzip < ./database/live_backups/$(/bin/ls -1t ./database/live_backups | head -1) | mysql -u $(wp dotenv get DB_USER) -p$(wp dotenv get DB_PASSWORD) -h $(wp dotenv get DB_HOST | sed -E "s/^([^\:]+).+/\1/g") $(wp dotenv get DB_NAME)'
```

You may need to clear Redis cache if this isn't your first database import.

## Download WP uploads directory

Get the site ID.

```sh
terminus site:list --field=ID
```

Replace `<ID>` with site ID from previous command.

```sh
rsync -rvlz --copy-unsafe-links --size-only --checksum --ipv4 --progress -e 'ssh -p 2222' live.<ID>@appserver.live.<ID>.drush.in:files/. ./.data/uploads/.
```

## Create yourself a local WP user account

```sh
docker exec -it hypr-php /bin/bash -c 'wp user create <USER> <EMAIL> --role=administrator'
```

A password will be returned to the terminal. Copy it and save it.
