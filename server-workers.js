'use strict';

process.env.NODE_APP = 'workers';
process.setMaxListeners(0);

require('dotenv').config();
require('./config');


require('./app/plugins/thirdParty/rabbit/concumer')();


process.on('uncaughtException', function (err) {
  console.error('Rabbit Consumers', (new Date).toUTCString() + ' uncaughtException:', err.message);
  console.error('Rabbit Consumers', err.stack);
  process.exit(1);
});