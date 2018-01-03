// server.js
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// API Routes
const api = require('./server/routes/api');
// Database
const database = require('./server/database-config');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static path to dist
app.use(express.static(__dirname + '/dist'));

// Set our api routes
app.use('/api', api);

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Get port from environment and start listening
const port = process.env.PORT || '8080';
app.set('port', port);

database.connect((err, db) => {
  const server = http.createServer(app);
  server.listen(port, () => console.log(`API running on localhost:${port}`));
});
