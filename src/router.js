import React from 'react';
import {Route, NotFoundRoute} from 'react-router';

import App from './components/App';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

export default (
  <Route path="/" handler={App}>
    <Route path="login" handler={LoginPage} />
    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);
