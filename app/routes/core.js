'use strict';

module.exports = function(app) {

  const core = require('../controllers/core');

  app.all('/info', core.info);
};