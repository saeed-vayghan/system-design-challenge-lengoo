'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


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
 * AccessToken Schema
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


const ClientModel       = mongoose.model('Client', ClientSchema);
const AccessTokenModel  = mongoose.model('AccessToken', AccessTokenSchema);
const RefreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports.ClientModel       = ClientModel;
module.exports.AccessTokenModel  = AccessTokenModel;
module.exports.RefreshTokenModel = RefreshTokenModel;