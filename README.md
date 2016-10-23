# Trier.hu website 

## Trier based utils

Various applications for people who live in Trier or Luxembourg.

Utilities for the people, experience for the developers.

* ~~ExpressJS~~
* ~~Mongoose~~
* ES6 with Babel compiler
* WebPack
* Gulp
* SASS
* Slim
* Twig

[Trier.hu](http://www.trier.hu)

## Install

### Dev

#### Install backend dependencies.

```bash
composer install
```

#### Install frontend dependencies.

```bash
npm install
```

#### Build site.

```bash
node_modules/.bin/gulp --dev
```

#### Run from local.

```bash
php -S localhost:8000 -t web/
```

### Production


#### Install backend dependencies.

```bash
composer install --no-dev
```

#### Install frontend dependencies.

```bash
npm install
```

#### Build site.

```bash
node_modules/.bin/gulp --prod
```

#### Run from local.

```bash
php -S localhost:8000 -t web/
```