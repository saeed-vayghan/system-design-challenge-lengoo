'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const lastMod  = require('../plugins/models/lastMod');


/**
 * Subtitles Schema
 */
const languageEnum = ['en', 'de'];
const statusEnum   = ['pending', 'translated', 'failed'];

const subtitleSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    fileName: {
      type: String,
      trim: true,
      required: true
    },

    sourceLanguage: {
      type: String,
      enum: languageEnum,
      trim: true,
      required: true
    },

    targetLanguage: {
      type: String,
      enum: languageEnum,
      trim: true,
      required: true
    },

    status: {
      type: String,
      enum: statusEnum,
      trim: true,
      required: true,
      default: 'pending'
    },

    originalHash: String,
    translatedHash: String,

    reported: {
      type: Boolean,
      default: false,
      required: true
    },

    created: Date,
    updated: Date
  },
  {
    collection: 'subtitles',
    strict: true,
    autoIndex: true
  }
);

subtitleSchema.plugin(lastMod);


module.exports = mongoose.model('Subtitles', subtitleSchema);