# beer-quest

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Known Vulnerabilities](https://snyk.io/test/github/st3v3nhunt/beer-quest/badge.svg)](https://snyk.io/test/github/st3v3nhunt/beer-quest)

> X-Lab Engineering Interview Challenge

## Running the application

The application is containerised for Docker and can be run via `docker` or
`docker-compose` commands. The easiest option is to use the convenience script
([scripts/start](./scripts/start)) which includes the commands to start the
application via `docker-compose`.

The commands to run the application with just docker are:

```shell
docker build . --build-arg NODE_ENV=development -t beer-quest

docker run --init -p 3000:3000 -p 9229:9229 -t beer-quest
```
