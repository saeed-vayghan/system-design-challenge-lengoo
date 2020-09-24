'use strict';

process.env.NODE_APP = 'workers';
process.setMaxListeners(0);

require('dotenv').config();
require('./config');

// connect to db
require('./config/dbconfigs')();

// Inject models
require('./app/models/core');
require('./app/models/public');


const workers = require('./workers')

// Run Concumers
require('./app/plugins/thirdParty/rabbit/concumer')(workers);


process.on('uncaughtException', function (err) {
  console.error('*** Rabbit Consumers', (new Date).toUTCString() + ' uncaughtException:', err.message);
  console.error('*** Rabbit Consumers', err.stack);
  process.exit(1);
});