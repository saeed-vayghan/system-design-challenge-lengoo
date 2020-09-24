'use strict';

module.exports = {
  mongo: {
    uri: process.env.MONGODB_URL_PRO
  },

  rabbit: process.env.RABBITMQ_SERVER,

  authToken: process.env.AUTH_TOKEN
}