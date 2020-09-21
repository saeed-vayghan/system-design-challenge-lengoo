'use strict';


module.exports = function(app) {
  require('./core')(app);
  require('./users')(app);
  require('./translations')(app);
  require('./subtitles')(app);
};