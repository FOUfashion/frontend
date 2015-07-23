import React from 'react';
import Router from 'react-router';
import KoaRouter from 'koa-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';

import serialize from 'serialize-javascript';
import flux from '../flux';
import debug from 'debug';

const indexView = require('../views/index.hbs');
const router = new KoaRouter({ prefix: '/' });
const log = debug('fou:server:root');

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
    script: `window.__dehydratedState = ${dehydratedState};`
  });
});

export default router;
