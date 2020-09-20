'use strict';


module.exports = function(app) {
  require('./core')(app);
  require('./translations')(app);
};