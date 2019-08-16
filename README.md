# Tsuki client

Client part of "Tsuki" project written in Angular 8. A [server](https://github.com/Aztic/tsuki-server) instance running is necessary.

## Install
- Clone the repository
```sh
git clone https://github.com/Aztic/tsuki-server && cd tsuki-client
```
- Copy config examples and configure them as necessary
```sh
npm run copy-config
```
This will generate `environment.ts` and `environment.prod.ts` from the example files.

- Build the project
```
npm run build-prod
```

