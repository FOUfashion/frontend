import React from 'react';
import Router from 'react-router';
import KoaRouter from 'koa-router';

import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import DocumentTitle from 'react-document-title';
import * as AppActions from '../actions/AppActions';

import routes from '../routes';
import Location from 'react-router/lib/Location';

import serialize from 'serialize-javascript';
import flux from '../flux';
import debug from 'debug';

import path from 'path';
import fs from 'fs';

import indexView from '../views/index.hbs';
import inlineCss from '!!css?minimize!autoprefixer!sass!../sass/inline.scss';

const router = new KoaRouter({ prefix: '/' });
const log = debug('fou:server:root');
let assets = {};

if (!__DEV__) {
  log('reading asset names');
  fs.readFile(path.join(__dirname, 'webpack-assets.json'), 'utf8', function(err, data) {
    if (err) {
      return console.error(err);
    }

    assets = JSON.parse(data).main;
  });
}

router.head('/logout', function *() {
  this.session = null;
});

router.get('*', function *() {
  const context = flux.ctx;//createContext();
  const componentContext = context.getComponentContext();

  if (this.path === '/logout') {
    log('purging session');
    this.session = null;
  } else {
    log('initializing flux state');
    yield context.executeAction(AppActions.serverInit, {
      account: this.session.account
    });
  }

  log('running router');
  const [initialState, transition] = yield new Promise((resolve, reject) => {
    const location = new Location(this.path, this.query);
    const callback = (error, ...args) => error ? reject(error) : resolve(args);
    Router.run(routes(componentContext), location, callback);
  });

  // Handle redirection or not found
  if (transition.isCancelled) {
    this.redirect(transition.redirectInfo.pathname);
    return;
  } else if (!initialState) {
    this.status = 404;
  }

  log('serializing dehydrated flux state');
  const dehydratedState = serialize(flux.dehydrate(context));

  log('rendering html');
  const Root = (
    <FluxibleComponent context={componentContext}>
      <Router {...initialState} />
    </FluxibleComponent>
  );

  this.body = indexView({
    body: React.renderToString(Root),
    script: `window.__dehydratedState = ${dehydratedState};`,
    title: DocumentTitle.rewind(),
    showPreloader: this.path === '/',
    jsBundle: assets.js || `http://${process.env.FRONTEND_HOSTNAME || '0.0.0.0'}:${process.env.FRONTEND_WP_PORT || 8080}/bundle.js`,
    cssBundle: assets.css,
    inlineCss: inlineCss
  });
});

export default router;
