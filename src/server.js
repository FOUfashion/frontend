import path from 'path';
import express from 'express';
import React from 'react';
import './core/Dispatcher';
import './stores/AppStore';
import db from './core/Database';
import App from './components/App';

const server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/query', require('./api/query'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

// The top-level React component + HTML template for it
const template = require('./templates/index.hbs');

server.get('*', async (req, res, next) => {
  try {
    // TODO: Temporary fix #159
    if (['/', '/about', '/privacy'].indexOf(req.path) !== -1) {
      await db.getPage(req.path);
    }

    let notFound = false;
    let css = [];
    let data = { description: '' };
    let app = (<App
      path={req.path}
      context={{
        onInsertCss: (value) => css.push(value),
        onSetTitle: (value) => data.title = value,
        onSetMeta: (key, value) => data[key] = value,
        onPageNotFound: () => notFound = true
      }} />);

    data.body = React.renderToString(app);
    data.css = css.join('');

    if (notFound) {
      res.status(404);
    }

    const html = template(data);
    res.send(html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
