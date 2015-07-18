# Fou Frontend

[![Circle CI](https://img.shields.io/circleci/project/FOUfashion/frontend/master.svg)](https://circleci.com/gh/FOUfashion/frontend)
[![Coverage](https://img.shields.io/coveralls/FOUfashion/frontend/master.svg)](https://coveralls.io/github/FOUfashion/frontend?branch=master)
[![Dependencies](https://img.shields.io/david/FOUfashion/frontend.svg)](https://david-dm.org/FOUfashion/frontend)

This project is based on [React Starter Kit](https://github.com/kriasoft/react-starter-kit). It uses [React](https://facebook.github.io/react/), [Flux](http://facebook.github.io/flux/), [WebPack](http://webpack.github.io/), [SCSS](http://sass-lang.com/) and [Babel](https://babeljs.io/).

## Build

```bash
# install node.js components
$ npm install

# start in production mode
$ npm start

# start in dev mode
$ npm run start-dev

# start in dev mode with BrowserSync
$ npm run start-sync
```

## Tests

Facebook's [Jest](https://facebook.github.io/jest/) is used to run unit tests.

```bash
# run the tests
$ npm test

# automatically re-run the tests on code changes
$ npm run test-watch

# run the tests and generate a report in coverage/
$ npm run coverage

# automatically re-run the tests with coverage on code changes
$ npm run coverage-watch

# also lint the code if you're feeling fancy
$ npm run lint

# and if you can't help from typing...
$ npm run lint-watch
```
## IDE and linting

I use [Atom](https://atom.io/) with `atom-beautify`, `autocomplete`, `language-babel`, `linter`, `linter-eslint`, `linter-scss-lint` and `css-comb`. These plugins provide code formatting, auto completion, ES6 support and linting.
