'use strict';

const sanitize = require('../../utils/sanitizer');
const mongoose = require('mongoose');
const Client   = mongoose.model('Client');



const findOneByQuery = async (query) => {
  return await Client.findOne(sanitize(query))
}


module.exports = {
  findOneByQuery,
}