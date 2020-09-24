'use strict';


module.exports = function(app) {
  require('./bootstrap')(app);
  require('./translations')(app);
};