'use strict';

module.exports = {
  app: {
    title: 'system-design-challenge-lengoo',
    description: 'Description',
    version: '1.0',
    authors: 'Saeed Vayghani'
  },

  hash_secret: process.env.HASH_SECRET,

  caching: {
    models: {
      user: {
        ttl: 60 * 60 * 24
      }
    }
  }
}