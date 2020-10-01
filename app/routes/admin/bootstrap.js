'use strict';

module.exports = function(app) {

  const bootstrap = require('../../controllers/admin/bootstrap');


  app.post('/bootstrap', bootstrap.start);
};