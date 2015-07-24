![Fou Frontend](header.png)

[![Circle CI](https://img.shields.io/circleci/project/FOUfashion/frontend/master.svg)](https://circleci.com/gh/FOUfashion/frontend)
[![Coverage](https://img.shields.io/coveralls/FOUfashion/frontend/master.svg)](https://coveralls.io/github/FOUfashion/frontend?branch=master)
[![Dependencies](https://img.shields.io/david/FOUfashion/frontend.svg)](https://david-dm.org/FOUfashion/frontend)

Fou Frontend is an isomorphic app built with modern technologies and a focus on design and performance. It uses:

- [React](https://facebook.github.io/react/) for UI rendering
- [Fluxible](http://fluxible.io/) for a [Flux architecture](https://facebook.github.io/flux/docs/overview.html) with unidirectional data flow
- [Immutable](https://facebook.github.io/immutable-js/) and React "pure" components for bleeding edge performance
- [Belle](http://nikgraf.github.io/belle/) as the main components library
- [Koa](http://koajs.com/) as the backend server for file serving and React pre-rendering
- [webpack](http://webpack.github.io/) to compile and bundle everything together
- [SCSS](http://sass-lang.com/) for sassy stylesheets
- [Babel](https://babeljs.io/) for classy ES6+ code

> I used [kriasoft/react-starter-kit](https://github.com/kriasoft/react-starter-kit) as a starting point.

## UI Features :sparkles:

- elegant landing page with good copy and a clear value proposition for the target users

## Technical Features :boom:

- resource bundles contain a hash in their name for cache busting => efficient, long-term caching
- server side pre-rendering => SPA app with unaffected SEO

## Build :pray:

```bash
# install node dependencies
$ npm install

# start in production mode
$ npm start

# build and start in dev mode
$ npm run start-dev

# build and start in dev mode with BrowserSync
$ npm run start-sync
```

## Tests :ok_hand:

Facebook's [Jest](https://facebook.github.io/jest/) is used to run unit tests.

```bash
# run the tests
$ npm test

# automatically re-run the tests on code changes
$ npm run test-watch

# run the tests and generate a report in ./coverage/
$ npm run coverage

# automatically re-run the tests with coverage on code changes
$ npm run coverage-watch

# also lint the code if you're feeling fancy
$ npm run lint

# and if you can't help from typing...
$ npm run lint-watch
```
## IDE and linting :star:

I use [Atom](https://atom.io/) with `atom-beautify`, `autocomplete`, `language-babel`, `linter`, `linter-eslint`, `linter-scss-lint` and `css-comb`. These plugins provide code formatting, auto completion, ES6+ support and linting.
