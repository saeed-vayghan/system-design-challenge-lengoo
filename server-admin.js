'use strict';

require('dotenv').config();

const config = require('./config');
const app    = require('./config/express.admin');

const port = (process.env.NODE_ENV === 'test') ? 8889 : config.admin_port;

app.listen(port, () => console.log(`Admin APIs Listening on: ${port}`));

process.on('uncaughtException', function (err) {
  console.error('*** Admin Server Failed!', (new Date).toUTCString() + ' uncaughtException:', err.message);
  console.error('*** Admin Server Failed!', err.stack);
  process.exit(1);
});