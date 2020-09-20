'use strict';

module.exports = function(app) {

  const core         = require('../controllers/core');
  const translations = require('../controllers/translations');

  const headerMiddleWares = require('../plugins/middlewares/headers');
  const authMiddleWares   = require('../plugins/middlewares/authentication');
  const apiCallLogger     = require('../plugins/apiCallLogger');

  app.options('*',  headerMiddleWares.setCorsResponse);
  app.all('*',  headerMiddleWares.setHeaders, apiCallLogger.log);

  app.all('/info', core.info);

  app.all('/api/*', authMiddleWares.checkToken);

  app.get('/api/find', translations.find);
};