'use strict';

module.exports = function(app) {

  const translations = require('../../controllers/admin/translations');


  app.post('/api/translations', translations.feed);
};