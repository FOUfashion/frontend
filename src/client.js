import React from 'react';
import Router from 'react-router';
import FluxibleComponent from 'fluxible-addons-react/FluxibleComponent';
import debug from 'debug';
import flux from './flux';

const log = debug('fou:client');

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
