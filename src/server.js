import koa from 'koa';
import serve from 'koa-static';
import debug from 'debug';

import React from 'react';
import Router from 'react-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';

import serialize from 'serialize-javascript';
import flux from './flux';

const server = koa();
const indexView = require('./views/index.hbs');
const log = debug('server');

// Serve files from the public folder
log('serving from %s/public', __dirname);
server.use(serve('./public'));

// Register API routes
log('registering API routes');

const routers = [
  require('./api/counter')
];

routers.forEach(function(router) {
  log(router.prefix);
  server.use(router.routes());
  server.use(router.allowedMethods());
});

// Register server-side rendering
server.get('*', function *() {
  const [Handler, state] = yield new Promise(resolve => {
    Router.run(flux.getAppComponent(), this.url, ...args => resolve(args));
  });

  if (state.routes.length === 0) {
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

// Start listening
server.listen(process.env.PORT || 5000, function() {
  if (process.send) {
    process.send('online');
  } else {
    console.log('Listening on %s', server.get('port'));
  }
});
