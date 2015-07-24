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

const indexView = require('../views/index.hbs');
const router = new KoaRouter({ prefix: '/' });
const log = debug('fou:server:root');
let assets = {};

fs.readFile(path.join(__dirname, 'webpack-assets.json'), 'utf8', function(err, data) {
  if (err) {
    return console.error(err);
  }

  try {
    assets = JSON.parse(data).main;
  } catch (ex) {
    console.error('Error while trying to parse webpack-assets.json', ex);
  }
});

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
      <Handler />
    </FluxibleComponent>
  );

  this.body = indexView({
    body: React.renderToString(Root),
    script: `window.__dehydratedState = ${dehydratedState};`,
    title: DocumentTitle.rewind(),
    jsBundle: assets.js,
    cssBundle: assets.css
  });
});

export default router;
