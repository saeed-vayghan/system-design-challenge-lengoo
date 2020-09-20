'use strict';

module.exports = function(app) {

  const core = require('../controllers/core');

  const headerMiddleWares = require('../plugins/middlewares/headers');
  const authMiddleWares   = require('../plugins/middlewares/authentication');
  const apiCallLogger     = require('../plugins/apiCallLogger');

  app.options('*',  headerMiddleWares.setCorsResponse);
  app.all('*',  headerMiddleWares.setHeaders, apiCallLogger.log);

  app.all('/info', core.info);

  // app.all('/api/*', authMiddleWares.checkToken);
};