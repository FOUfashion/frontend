![Fou Frontend](header.png)

[![Circle CI](https://img.shields.io/circleci/project/FOUfashion/frontend/master.svg)](https://circleci.com/gh/FOUfashion/frontend)
[![Coverage](https://img.shields.io/coveralls/FOUfashion/frontend/master.svg)](https://coveralls.io/github/FOUfashion/frontend?branch=master)
[![Dependencies](https://img.shields.io/david/FOUfashion/frontend.svg)](https://david-dm.org/FOUfashion/frontend)

Fou Frontend is an isomorphic app built with modern technologies and a focus on design and performance. It uses:

- [React](https://facebook.github.io/react/) for UI rendering
- [Fluxible](http://fluxible.io/) for a [Flux architecture](https://facebook.github.io/flux/docs/overview.html) with unidirectional data flow
- [Immutable](https://facebook.github.io/immutable-js/) and React "pure" components for bleeding edge performance
- [Koa](http://koajs.com/) as the backend server for file serving and React pre-rendering
- [webpack](http://webpack.github.io/) to compile and bundle everything together, hot reload included :fire:
- [SCSS](http://sass-lang.com/) and [Susy](http://susy.oddbird.net/) for sassy stylesheets
- [Babel](https://babeljs.io/) for classy ES6+ code

> I used [kriasoft/react-starter-kit](https://github.com/kriasoft/react-starter-kit) as a starting point (hence the many commits).

## UI Features :sparkles:

- elegant landing page with good copy and a clear value proposition for the target users
- mobile-first responsive design that looks great on smartphones, tablets and desktops
- page transitions, loaders, smooth animations and UX enhancements
- form validation
  - client-side checks for length and valid characters
  - server-side for uniqueness

## Technical Features :boom:

- resource bundles contain a hash in their name for cache busting => efficient, long-term caching
- each component has a local stylesheet => concise and shallow stylesheets, reduced conflicts
- webpack-dev-server reloads components and stylesheets instantly => faster dev, improved productivity
- server side pre-rendering => speedy SPA app with unaffected SEO
- auth: login, logout, registration

## To-Do :dizzy:

- pages: profile, conversations, settings
- functionality: write posts/comments, like posts/comments, messaging
- integrate with "inspiration sources" such as 500px, Artsy, Instagram, Pinterest
- automated E2E tests with [Nightwatch.js](http://nightwatchjs.org/)
- refactoring
  - components, decorators, server
  - try to move form logic into Fluxible stores
  - get rid of material-ui; use own or dedicated components

## Pre-Requisites :computer:

You need the following:

- `node.js` with generators support or `io.js`
- a Redis server running on localhost
- the `FOUfashion/api` server

If you're using the `FOUfashion/development` repo set-up, run these commands to start the database and the reverse proxy:

```bash
$ docker-compose up -d redis
$ docker-compose up -d nginx
$ source ../.env
```

## Build :pray:

```bash
# install node dependencies
$ npm install

# build in production mode and start
$ npm run bundle && npm run start

# source config env vars
$ source ../.env

# build the server bundle with auto-restart
$ npm run watch-server

# build the client bundle with hot reload
$ npm run watch-client

# run BrowserSync as a proxy
$ npm run browser-sync
```

## Debugging :bug:

I use [debug](https://github.com/visionmedia/debug) to log detailed messages for app debugging. To enable logging:

- Client side: run `Debug.enabled('fou:*')` in the console and refresh the page
- Server side: run `export DEBUG="fou:*"` and restart the server

If logging is not enabled, log calls are just no-ops.

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

## LAN access :airplane:

While in dev mode, the servers will run on `0.0.0.0`. If you want access from another device, set the `HOSTNAME` env var to the appropriate IP (LAN or public).

## IDE and linting :star:

I use [Atom](https://atom.io/) with `atom-beautify`, `autocomplete`, `language-babel`, `linter`, `linter-eslint`, `linter-scss-lint` and `css-comb`. These plugins provide code formatting, auto completion, ES6+ support and linting.

## Dev Guide :notebook_with_decorative_cover:

- Components
  - composition > inheritance
  - use decorators and higher order components

- Component styling
  - each component has a local stylesheet `styles.scss`, preferred over JS
  - all the class names in a component must come from the local stylesheet
  - to reuse styles, use `scss` mixins and define new classes in the local stylesheet
  - if a certain element and style is used frequently, consider making it a component
  - if the root element has a class, try to name it the same as the component
