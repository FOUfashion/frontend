import React from 'react';
import Router from 'react-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import debug from 'debug';
import flux from './flux';

const log = debug('fou:client');

// Load the app
window.addEventListener('DOMContentLoaded', function() {
  window.Debug = debug;

  log('rehydrating from window.__dehydratedState');
  flux.rehydrate(window.__dehydratedState, function(err, context) {
    if (err) {
      return log(err);
    }

    log('rendering root');
    Router.run(flux.getComponent(), Router.HistoryLocation, function(Handler, state) {
      const Root = (
        <FluxibleComponent context={context.getComponentContext()}>
          <Handler {...state} />
        </FluxibleComponent>
      );

      React.render(Root, document.getElementById('app'), () => log(`rendered ${state.pathname}`));
    });
  });
});

// Loader animation
const loaderElem = document.getElementById('loader');
const appElem = document.getElementById('app');

if (loaderElem) {
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
