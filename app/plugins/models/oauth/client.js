'use strict';

const mongoose = require('mongoose');
const Client   = mongoose.model('Client');


const createClients = async (user, client) => {
  let error  = null;
  let result = null;

  try {

    result = await Client.create(
      [
        { name: 'Web App', client: 'webApp' },
        { name: 'Android Mobile App', client: 'androidMobileApp' },
        { name: 'IOS Mobile App', client: 'iosMobileApp' }
      ],
      { upsert: true }
    );

  } catch (ex) {
    error = ex;
  }

  return {
    result,
    error
  };
};


module.exports = {
  createClients,
}