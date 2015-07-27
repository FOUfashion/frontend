import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import App from './components/App';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import FeedPage from './pages/FeedPage';

import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';

export default (
  <Route path="/" handler={App}>
    <Route path="login" handler={LoginPage} />
    <Route path="register" handler={RegisterPage} />

    <Route path="feed" handler={FeedPage} />

    <DefaultRoute handler={LandingPage} />
    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);
