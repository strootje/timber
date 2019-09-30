# Timber
[![Build Status](https://travis-ci.org/strootje/timber.svg?branch=master)](https://travis-ci.org/strootje/timber)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=strootje_timber&metric=alert_status)](https://sonarcloud.io/dashboard?id=strootje_timber)

## Install

### Requirements
* pnpm (`npm i -G pnpm`)
* docker

### Git
```
git clone git@github.com:strootje/timber.git
cd ./timber
pnpm i
docker run -d --rm --name timber.db -p 5984:5984 couchdb:latest
pnpm run serve
```

### Alternatives
* via docker?
* download from releases?

## Usage
todo...

## Usefull
https://medium.com/@madumalt/oauth2-proxy-for-single-page-applications-8f01fd5fdd52

## Errors...
Errors met linked preact-bulma-components komt door symlink issues

## Contributing
Feedback and idea's are welkom.

## License
[MPL-2.0](https://github.com/strootje/timber/blob/master/LICENSE.md)
