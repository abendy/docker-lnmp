# Docker LNMP stack

Docker-based Alpine Linux + nginx + MariaDB + PHP (LNMP) + WordPress project

## Prerequisites (macOS)

* [Docker](https://docs.docker.com/get-docker/)
* [Homebrew](http://brew.sh)
* [PHP](https://www.php.net/manual/en/install.php)

## Install prerequisite tooling (macOS)

```sh
brew install curl composer git rsync
```

## Add Composer to PATH (optional)

```sh
export PATH="vendor/bin:$PATH"
export PATH="$(composer config -g home)/vendor/bin:$PATH"
```

Consider adding this to your shell runtime configuration.

## Install Terminus

```sh
composer global require consolidation/cgr

cgr pantheon-systems/terminus
```

This is not the method recomended in Pantheon's [installation documentation](https://pantheon.io/docs/terminus/install). See [cgr documentation](https://github.com/consolidation/cgr) to evaluate this method for your setup.

## Generate Pantheon machine token

[Pantheon Machine Tokens](https://dashboard.pantheon.io/users/#account/tokens/list)

Copy your machine token to your clipboard. You could export this as an environment variable in your shell runtime configuration or save this machine token somewhere safe.

```sh
export TERMINUS_MACHINE_TOKEN="<MACHINE-TOKEN>"
```

## Login to Pantheon using Terminus and your new machine token

```sh
terminus auth:login --machine-token=$TERMINUS_MACHINE_TOKEN
```

## Generate SSH keys

```sh
ssh-keygen -t ed25519 -C <EMAIL> -f ~/.ssh/docker_lnmp_ed25519

ssh-add ~/.ssh/<private-key>
```

## Add public key to Pantheon (macOS)

```sh
pbcopy < ~/.ssh/<public-key.pub>
```

[Pantheon SSH keys](https://dashboard.pantheon.io/users/#account/ssh-keys)

## Load WP completion (optional)

```sh
curl -Ss -o /usr/local/bin/wp-completion.bash https://raw.githubusercontent.com/wp-cli/wp-cli/master/utils/wp-completion.bash

source /usr/local/bin/wp-completion.bash
```

Consider adding `source ...` to your shell runtime configuration.
