import path from 'path';
import db from './core/Database';
import express from 'express';
import React from 'react';
import App from './components/App';

const server = express();
const pageTemplate = require('./templates/index.hbs');

// Set Express port and public folder
server.set('port', process.env.PORT || 5000);
server.use(express.static(path.join(__dirname, 'public')));

// Register API middleware
server.use('/api/query', require('./api/query'));

// Register server-side rendering middleware
server.get('*', async function(req, res, next) {
  try {
    if (['/', '/about', '/privacy'].indexOf(req.path) !== -1) {
      await db.getPage(req.path);
    }

    let notFound = false;
    let data = {};

    let app = (
      <App path={req.path} context={{
        onSetTitle: (value) => data.title = value,
        onSetMeta: (key, value) => data[key] = value,
        onPageNotFound: () => notFound = true
      }}/>
    );

    if (notFound) {
      res.status(404);
    }

    data.body = React.renderToString(app);
    res.send(pageTemplate(data));
  } catch (err) {
    next(err);
  }
});

// Start the server
server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
