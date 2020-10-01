'use strict';

const config = require('../../../config');
const crypto = require('crypto');
const secret = config.hash_secret;


const hash = (input) => {
  return crypto.createHash('sha256', secret).update(input).digest('hex'); 
};


module.exports = hash;