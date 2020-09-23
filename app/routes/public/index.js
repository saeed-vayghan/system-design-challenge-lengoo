'use strict';


module.exports = function(app) {
  require('./users')(app);
  require('./subtitles')(app);
};