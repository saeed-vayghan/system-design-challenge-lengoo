'use strict';

module.exports = {
  redis: {

    server: 'redis://',

    Databases: {

      sessions: {
        db: 0,
        expire: 86400
      },

      tokens: {
        db: 1,
        expire: 86400
      },

      models: {
        db: 2,
        expire: 86400
      },

      monitoring: {
        db: 3,
        expire: 86400
      },

      disableTTL: false
    }
  }
};