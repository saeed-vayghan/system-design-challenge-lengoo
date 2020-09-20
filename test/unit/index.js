'use strict';

require('dotenv').config();
require('../../config')

// connect to db
require('../../config/dbconfigs')();

// inject models
require('../../app/models/translations');


describe('DB Models', () => {
  require('./models/translations');
});

describe('Thirdpart Plugins', () => {
  require('./thirdParty');
});

describe('Utilities', () => {
  require('./utils');
});