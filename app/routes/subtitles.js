'use strict';

module.exports = function(app) {

  const subtitles = require('../controllers/subtitles');


  app.post('/api/upload', subtitles.upload);
};