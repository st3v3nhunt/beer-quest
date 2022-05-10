# Beer Quest API - Node.js

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io/test/github/st3v3nhunt/beer-quest/badge.svg)](https://snyk.io/test/github/st3v3nhunt/beer-quest)

> X-Lab Engineering interview challenge

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

## Deployed application

A version of the application has been (manually) deployed to
[Azure Container Instances](https://azure.microsoft.com/en-us/services/container-instances/#overview)
(ACI) and is available at
[http://beer-quest.uksouth.azurecontainer.io:3000/venues](http://beer-quest.uksouth.azurecontainer.io:3000/venues).

The deployment can be rerun using the script [deploy](./scripts/deploy).

The deployment can be deleted using the script [delete](./scripts/delete).

ACI isn't the most feature rich product. HTTPS appears to require some
additional configuration, hence HTTP! Port mapping also doesn't appear to be a
working feature, hence the specific port.

## Pushing images to Docker Hub

Images are pushed to
[hub.docker.com/repository/docker/st3v3nhunt/beer-quest](https://hub.docker.com/repository/docker/st3v3nhunt/beer-quest)
on Docker Hub for every commit to `main`.

## Some thoughts, considerations and next steps

* Some venues appear to be closed, these should probably be filtered out from
  the dataset either preload or during the load.
* The dataset is so small it doesn't seem worth introducing a database,
  obviously this would be different is the size was larger or the data was
  dynamic.
* The code for filtering venues based on scores has been kept simple. It would
  be possible to not run a filter if the rating had not been set however, as
  each filter operation should have a time complexity of O(n) I decided the
  additional code complexity wasn't worth the minimal performance hit. Given a
  larger datasets this might change but then the filtering would likely be done
  via a database.
* Some consideration has been given to malicious input, specifically the
  ratings and include distance params have some level of validation, however,
  the coords are not in anyway checked. This needs to be worked on.
* Ratings are taken as a minimum as I figured you'd want to have the good
  venues returned.
* The API could do with being documented so clients would have an easy time
  using it.
* It would be good to have tags create images with the appropriate tag.
* Each PR should create a review environment for testing prior to merge to
  `main`.
