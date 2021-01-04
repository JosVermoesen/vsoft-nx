# Multi-language landing page using Angular 10 and Bootstrap

## Getting started for users

Working version here: [site1](https://rv.be)
Working version here: [site2](https://vsoft.be)
Working version here: [site3](https://etsppieters.be)

marIntegraal users can get in touch for their own version of this app (including use of mail service via our dotnet core server)

## Getting started for developers

- [Install NodeJS](https://nodejs.org/). Hint: eventually install and use [nvm](https://medium.com/@Joachim8675309/installing-node-js-with-nvm-4dc469c977d9) for easy installing and/or switching between node versions
- Clone this repository: `git clone https://github.com/JosVermoesen/ngb-rv.git`
- Run `npm install` inside the project root.
- Run `ng serve` in a terminal from the project root.
- Run `ng build --prod` to compile stand alone distribution for hosting.
- Profit. :tada:

## Development Tools used for this app

- [NodeJS](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Angular CLI](https://www.npmjs.com/package/@angular/cli): `npm i -g @angular/cli`

## NPM packages used for this app

- [bootstrap](https://www.npmjs.com/package/bootstrap): `npm i bootstrap`
- [bootswatch](https://www.npmjs.com/package/bootswatch): `npm i bootswatch`
- [jquery](https://www.npmjs.com/package/jquery): `npm i jquery`
- [fontawesome angular](https://www.npmjs.com/package/@fortawesome/angular-fontawesome): `npm i @fortawesome/angular-fontawesome`
- [fontawesome svg core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core): `npm i @fortawesome/fontawesome-svg-core`
- [fontawesome free sold svg icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons): `npm i @fortawesome/free-solid-svg-icons`
- [bootstrap icons](https://www.npmjs.com/package/bootstrap-icons): `npm i bootstrap-icons`
- [ngx-bootstrap](https://www.npmjs.com/package/ngx-bootstrap): `npm i ngx-bootstrap`
- [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core): `npm i @ngx-translate/core`
- [@ngx-translate/http-loader](https://www.npmjs.com/package/@ngx-translate/http-loader): `npm i @ngx-translate/http-loader`

- [ngx-quill](https://www.npmjs.com/package/ngx-quill): `npm i ngx-quill`
- [quill](https://www.npmjs.com/package/quill): `npm i quill`

- install all packages in one commandline: `npm i bootstrap bootswatch jquery @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons bootstrap-icons ngx-bootstrap @ngx-translate/core @ngx-translate/http-loader quill ngx-quill`

## file styles.scss

For use of bootstrap, add into file styles.css:

```bash
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
```

## warnings for contentful

In angular.json, to avoid CommonJs warnings, add **allowedCommonJsDependencies** in the options section for **lodash, axios and qs**:

```bash
"builder": "@angular-devkit/build-angular:browser",
          "options": {

            "allowedCommonJsDependencies": [
              "lodash",
              "axios",
              "qs"
            ],

```

## file angular.json scripts

For use of js from bootstrap and jquiry, add into scripts section:

```bash
"scripts": [
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js"

```

## tsconfig.json changes for using version stamp in app

Before building, set resolveJsonModule to 'true' :

```bash
"compilerOptions": {

    "resolveJsonModule": true,

```

## Best practices: use lazy loading modules

- Generate modules ex. a hosting module: `ng generate module modules/hosting --route hosting --module app.module`
- Generate modules ex. a contact module: `ng generate module modules/contact --route contact --module app.module`

## Good practice: Updating Angular as needed

This app is on Angular 11. Update to latest Angular 11 with:
`ng update @angular/cli@11 @angular/core@11`

Follow the instructions eventualy for fixes
