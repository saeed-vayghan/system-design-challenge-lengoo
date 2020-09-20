'use strict';

const express = require('express');
const app     = express();

// Might be used later
const bodyParser  = require('body-parser');
const compression = require('compression');
const helmet      = require('helmet');
const fileUpload  = require('express-fileupload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.disable('x-powered-by');
app.set('showStackError', true);
app.use(compression());
app.use(fileUpload());

// connect to db
require('./dbconfigs')();

// inject models
require('../app/models');

// inject routes
require('../app/routes/core')(app);
require('../app/routes/translations')(app);


module.exports = app;