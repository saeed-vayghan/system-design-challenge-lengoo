'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const lastMod  = require('../plugins/models/lastMod');


/**
 * User Schema
 */
const rolesEnumSet = 'USER ADMIN'.split(' ');
const UserSchema = new Schema(
  {
    displayName: {
      type: String,
      trim: true,
      default: ''
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true
    },

    hashedPassword: String,
    salt: String,

    roles: {
      type: [{
        type: String,
        enum: rolesEnumSet
      }],
      default: ['USER']
    },

    created: Date,
    updated: Date
  },
  {
    collection: 'users',
    strict: true,
    autoIndex: false,
    usePushEach: true
  }
);

UserSchema.plugin(lastMod);


module.exports = mongoose.model('User', UserSchema);