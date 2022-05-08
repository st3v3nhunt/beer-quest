# beer-quest

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io/test/github/st3v3nhunt/beer-quest/badge.svg)](https://snyk.io/test/github/st3v3nhunt/beer-quest)

> X-Lab Engineering Interview Challenge

## Getting started

The quickest and easiest way to get started is to clone the repo on a machine
where Docker is installed and start it up by running `./scripts/start`.

The application can be run without Docker, further information is below.

## Pre-requisites

### Pre-requisites - Docker

The application is containerised for Docker and can be run via `docker` or
`docker-compose` commands. Docker will need to be
[installed](https://docs.docker.com/get-docker/) to use this option.

### Pre-requisites - No Docker

The application can also be run without Docker, for this Node.js needs to be
[installed](https://nodejs.org/en/download/).

## Running the application

### Running - Docker

The easiest option is to use the convenience script
([scripts/start](./scripts/start)) which includes the commands to start the
application via `docker-compose`.

The commands to run the application with just docker are:

```shell
docker build . --build-arg NODE_ENV=development -t beer-quest

docker run --init -p 3000:3000 -p 9229:9229 -t beer-quest
```

### Running - No Docker

Once the repo has been cloned, the dependencies need to be installed by running
`npm install` in the project directory. The application can then be started by
running `npm run start` or `npm run start:watch`.

### Additional notes on running

#### Ports

By default, ports `3000` and `9229` are used by the application. If these are
already in use the application will fail to start. Please ensure both ports are
not in use before trying again.

## Testing the application

Tests for the application can be run in one of two modes via the convenience
script ([scripts/test](./scripts/test)). In order to run the tests once, simply
run the script with no options i.e. `./scripts/test`. The tests can also be run
in watch mode by passing `-w` to the script `./scripts/test -w`. This will
continually run the tests when file changes are detected and is a good option
to use whilst developing the application.
