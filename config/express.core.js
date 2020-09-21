'use strict';

const express = require('express');
const app     = express();

const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const compression    = require('compression');
const helmet         = require('helmet');
const fileUpload     = require('express-fileupload');

const { errorHandler } = require('../app/plugins/middlewares/error')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
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
require('../app/routes')(app);


app.use((err, req, res, next) => {
  errorHandler(err, res);
});


module.exports = app;