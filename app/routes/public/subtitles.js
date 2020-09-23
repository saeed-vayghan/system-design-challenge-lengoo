'use strict';

module.exports = function(app) {

  const subtitles = require('../../controllers/public/subtitles');


  app.post('/api/upload', subtitles.upload);
};