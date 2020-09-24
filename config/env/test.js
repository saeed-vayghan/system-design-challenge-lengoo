'use strict';

module.exports = {
  mongo: {
    uri: process.env.MONGODB_URL_DEV
  },

  rabbit: process.env.RABBITMQ_SERVER,

  authToken: process.env.AUTH_TOKEN
}