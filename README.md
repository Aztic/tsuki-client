# Tsuki client

Client part of "Tsuki" project written in Angular 8. A [server](https://github.com/Aztic/tsuki-server) instance running is necessary.


## Description
'Tsuki' is a app to have organised static html pages and display them from a url, so they can be used inside iframes and such.

## Why do this?
I usually visit forums from ForoActivo (the english version is Forumotion if i'm right), mostly, roleplay ones. There, is a common practice to have your "character card" written in Html / css code so is pretty to others.
Since i got tired of using third-party pages to preview / send code to friends; and / or store the html file at one of my servers and serve it through an iframe, i decided to do this.

~~Also to practice Angular~~

## Install
- Clone the repository
```sh
git clone https://github.com/Aztic/tsuki-server && cd tsuki-client
```
- Install dependencies
```sh
npm install
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

## TODO
- Client side project pagination
- Improve little screens layout

## Images
- Login
![Login](../master/images/login.png)
- Creating projects
![Creating](../master/images/create.png)
- Copying public project URL
![Copying](../master/images/copy.png)
- Inside that url
![Inside](../master/images/display.png)