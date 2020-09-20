'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const config   = require('../../config');

const { tokens: tokensClient } = require('../plugins/thirdParty/redis');



/**
 * Client Schema
 */
const ClientSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },

    client: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    collection: 'clients',
    strict: true,
    autoIndex: true
  }
);


/**
 * @class AccessTokenSchema
 */
const AccessTokenSchema = new Schema(
  {
    _user: {
      type: String,
      required: true
    },

    client: {
      type: String,
      required: true
    },

    token: {
      type: String,
      unique: true,
      required: true
    },

    created: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'accessTokens',
    strict: true,
    autoIndex: true
  }
);


/**
 * RefreshToken Schema
 */
const RefreshTokenSchema = new Schema(
  {
    _user: {
      type: String,
      required: true
    },

    client: {
      type: String,
      required: true
    },

    token: {
      type: String,
      unique: true,
      required: true
    },

    created: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'refreshTokens',
    strict: true,
    autoIndex: true
  }
);


AccessTokenSchema.post('save', function(doc) {
  const redisKey = 'accessTokens.' + doc.token;
  tokensClient.set(redisKey, JSON.stringify(doc));
  tokensClient.expire(redisKey, config.tokenLife);
});

AccessTokenSchema.post('remove', function(doc) {
  const accessTokenKey  = 'accessTokens.' + doc.token;
  tokensClient.del(accessTokenKey);
});


RefreshTokenSchema.post('save', function(doc) {
  const redisKey = 'refreshTokens.' + doc.token;
  tokensClient.set(redisKey, JSON.stringify(doc));
  tokensClient.expire(redisKey, config.tokenLife);
});

RefreshTokenSchema.post('remove', function(doc) {
  const refreshTokenKey = 'refreshTokens.' + doc.token;
  tokensClient.del(refreshTokenKey);
});

const ClientModel       = mongoose.model('Client', ClientSchema);
const AccessTokenModel  = mongoose.model('AccessToken', AccessTokenSchema);
const RefreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports.ClientModel       = ClientModel;
module.exports.AccessTokenModel  = AccessTokenModel; 
module.exports.RefreshTokenModel = RefreshTokenModel;