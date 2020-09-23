'use strict';

require('dotenv').config();
require('./config')

const app = require('./config/express.public');

app.listen(8080, () => console.log('Listening on: 8080'));

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  process.exit(1);
});