import React from 'react';
import {Route} from 'react-router';

import * as AppActions from './actions/AppActions';
import AppStore from './stores/AppStore';
import App from './components/App';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import FeedPage from './pages/FeedPage';

import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';

import request from 'superagent-bluebird-promise';
import debug from 'debug';

const log = debug('fou:routes');

function routes(context) {
  function requireLoggedIn(nextState, transition) {
    if (!context.getStore(AppStore).isSignedIn()) {
      log('not signed in, redirecting to /login');
      transition.to('/login');
    }
  }

  function requireLoggedOut(nextState, transition) {
    if (context.getStore(AppStore).isSignedIn()) {
      log('already signed in, redirecting to /feed');
      transition.to('/feed');
    }
  }

  async function doLogOut(nextState, transition) {
    log('signed out, redirecting');
    transition.to('/');

    try {
      log('signed out, executing action');
      await context.executeAction(AppActions.userSignedOut);

      if (!__SERVER__) {
        log('signed out, notifying server...');
        await request.head('/logout').promise();
        log('signed out, logged out from server too');
      }
    } catch(error) {
      log('signed out, unexpected error', error);
    }
  }

  return (
    <Route component={App}>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={LoginPage} onEnter={requireLoggedOut} />
      <Route path="/register" component={RegisterPage} onEnter={requireLoggedOut} />
      <Route path="/logout" onEnter={doLogOut} />
      <Route path="/feed" component={FeedPage} onEnter={requireLoggedIn} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
}

routes.onError = function(error) {
  log('unexpected error', error);
};

export default routes;
