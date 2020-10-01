'use strict';

module.exports = {
  app: {
    title: 'system-design-challenge-lengoo',
    description: 'Description',
    version: '1.0',
    authors: 'Saeed Vayghani'
  },

  public_port: process.env.NODE_PUBLIC_PORT,
  admin_port: process.env.NODE_ADMIN_PORT,

  hash_secret: process.env.HASH_SECRET,

  mongoObjIdRegEx: new RegExp('^[0-9a-fA-F]{24}$'),

  tokenLife: 2592000, // 30 * 24 * 60 * 60

  caching: {
    models: {
      user: {
        ttl: 60 * 60 * 24
      }
    }
  },

  gmail: {
    from: process.env.GMAIL_FROM,
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
}