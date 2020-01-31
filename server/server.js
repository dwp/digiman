const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const favicon = require('express-favicon');

require('./config')(app);

app.use(favicon(path.join(__dirname, '../dist', 'assets', 'images', 'favicon.ico')));

// Middleware to serve static assets
app.use('/', express.static(path.join(__dirname, '../dist')));

app.listen(PORT);