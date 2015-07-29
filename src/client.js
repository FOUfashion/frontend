import React from 'react';
import Router from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';

import debug from 'debug';
import routes from './routes';
import flux from './flux';

const log = debug('fou:bootstrap');
window.Debug = debug;

// Load the app
window.addEventListener('DOMContentLoaded', function() {
  log('rehydrating from window.__dehydratedState');
  flux.rehydrate(window.__dehydratedState, function(error, context) {
    if (error) {
      return log('unexpected error', error);
    }

    log('rendering root...');
    const componentContext = context.getComponentContext();
    const history = new BrowserHistory();

    const Root = (
      <FluxibleComponent context={componentContext}>
        <Router history={history} children={routes(componentContext)} onError={routes.onError} />
      </FluxibleComponent>
    );

    React.render(Root, document.getElementById('app'), () => log(`rendered root`));
  });
});

// Loader animation
const loaderElem = document.getElementById('loader');
const appElem = document.getElementById('app');

if (loaderElem) {
  appElem.style.overflow = 'hidden';

  Promise.all([
    new Promise(resolve => window.onload = resolve),
    new Promise(mainResolve => {
      Promise.all([
        new Promise(resolve => setTimeout(resolve, 500)),
        new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve))
      ]).then(function() {
        loaderElem.classList.add('animated');
        setTimeout(mainResolve, 1500);
      });
    })
  ]).then(function() {
    loaderElem.classList.add('hide');
    appElem.style.overflow = 'auto';
  });
}
