'use strict';

require('dotenv').config();

const config = require('./config');
const app    = require('./config/express.public');

const port = (process.env.NODE_ENV === 'test') ? 8888 : config.public_port;

app.listen(port, () => console.log(`Public APIs Listening on: ${port}`));

process.on('uncaughtException', function (err) {
  console.error('*** Public Server Failed!', (new Date).toUTCString() + ' uncaughtException:', err.message);
  console.error('*** Public Server Failed!', err.stack);
  process.exit(1);
});