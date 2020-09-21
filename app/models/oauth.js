'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const config   = require('../../config');

const { tokens: tokensClient } = require('../plugins/thirdParty/redis');
const { promisify } = require('util');
const set    = promisify(tokensClient.set.bind(tokensClient))
const del    = promisify(tokensClient.del.bind(tokensClient))
const expire = promisify(tokensClient.expire.bind(tokensClient))


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
 * AccessTokenSchema Schema
 */
const AccessTokenSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
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
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
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


AccessTokenSchema.post('save', async function(doc) {
  const redisKey = 'accessTokens.' + doc.token;
  await set(redisKey, JSON.stringify(doc));
  await expire(redisKey, config.tokenLife);
});

AccessTokenSchema.post('remove', async function(doc) {
  const accessTokenKey  = 'accessTokens.' + doc.token;
  await del(accessTokenKey);
});


RefreshTokenSchema.post('save', async function(doc) {
  const redisKey = 'refreshTokens.' + doc.token;
  await set(redisKey, JSON.stringify(doc));
  await expire(redisKey, config.tokenLife);
});

RefreshTokenSchema.post('remove', async function(doc) {
  const refreshTokenKey = 'refreshTokens.' + doc.token;
  await del(refreshTokenKey);
});

const ClientModel       = mongoose.model('Client', ClientSchema);
const AccessTokenModel  = mongoose.model('AccessToken', AccessTokenSchema);
const RefreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports.ClientModel       = ClientModel;
module.exports.AccessTokenModel  = AccessTokenModel; 
module.exports.RefreshTokenModel = RefreshTokenModel;