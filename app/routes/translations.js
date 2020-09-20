'use strict';

module.exports = function(app) {

  const translations = require('../controllers/translations');


  app.get('/api/find', translations.find);
  app.post('/api/upload', translations.upload);
};