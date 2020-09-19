'use strict';

require('dotenv').config();
require('./config')

const app = require('./config/express.core');

app.listen(8090, () => console.log('Listening on: 8090'));

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  process.exit(1);
});