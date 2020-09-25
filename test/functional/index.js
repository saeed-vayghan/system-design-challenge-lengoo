'use strict';

process.env.NODE_ENV = 'test';

/*
  Each test should consist below parts:
    - What is going to be tested?
    - What circumstances and scenario?
    - What is the expected result?

  Consider AAA pattern:
    Arrange: All the setup code to bring the system to the scenario the test aims to simulate.
    Act: Execute the unit under test.
    Assert: Ensure that the received value satisfies the expectation.
*/

require('dotenv').config();
require('../../config');

// connect to db
require('../../config/dbconfigs')();

// inject models
require('../../app/models/core');
require('../../app/models/public');
require('../../app/models/admin');


/*
  Test Suites
*/

describe('Controllers - Endpoints', () => {
  require('./suites/info');
  require('./suites/users');
});