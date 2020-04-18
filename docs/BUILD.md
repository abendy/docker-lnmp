# Project scaffold

## Install Build Tools plugin

```sh
mkdir -p ~/.terminus/plugins
composer create-project --no-dev -d ~/.terminus/plugins pantheon-systems/terminus-build-tools-plugin:^2
```

Additional commands and options can be found [here](https://github.com/pantheon-systems/terminus-build-tools-plugin#commands).

## Build project

```sh
terminus build:project:create --label='<SITE NAME>' --email=<EMAIL> --stability=dev --preserve-local-repository --keep --use-ssh --visibility=private "github.com/abendy/example-wordpress-composer:dev-master" docker-lnmp
```
