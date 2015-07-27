import React from 'react';
import Router from 'react-router';
import KoaRouter from 'koa-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import DocumentTitle from 'react-document-title';

import serialize from 'serialize-javascript';
import flux from '../flux';
import debug from 'debug';

import fs from 'fs';
import path from 'path';

import indexView from '../views/index.hbs';
import inlineCss from '!!css?minimize!autoprefixer!sass!../sass/inline.scss';

const router = new KoaRouter({ prefix: '/' });
const log = debug('fou:server:root');
let assets = {};

if (!__DEV__) {
  // Read asset names
  fs.readFile(path.join(__dirname, 'webpack-assets.json'), 'utf8', function(err, data) {
    if (err) {
      return console.error(err);
    }

    assets = JSON.parse(data).main;
  });
}

router.get('*', function *() {
  const [Handler, state] = yield new Promise(resolve => {
    log('running router');
    Router.run(flux.getComponent(), this.url, (...args) => resolve(args));
  });

  if (state.routes.filter(route => route.isNotFound).length) {
    this.status = 404;
  }

  log('serializing dehydrated flux state');
  const context = flux.createContext();
  const dehydratedState = serialize(flux.dehydrate(context));

  log('rendering html');
  const Root = (
    <FluxibleComponent context={context.getComponentContext()}>
      <Handler {...state} />
    </FluxibleComponent>
  );

  this.body = indexView({
    body: React.renderToString(Root),
    script: `window.__dehydratedState = ${dehydratedState};`,
    title: DocumentTitle.rewind(),
    showPreloader: this.url === '/',
    jsBundle: assets.js || `http://${process.env.HOSTNAME || '0.0.0.0'}:8080/bundle.js`,
    cssBundle: assets.css,
    inlineCss: inlineCss
  });
});

export default router;
