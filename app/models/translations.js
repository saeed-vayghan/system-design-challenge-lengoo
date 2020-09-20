'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const hash     = require('../plugins/utils/hash')
const lastMod  = require('../plugins/models/lastMod');


/**
 * Translations Schema
 */
const languageEnum = ['en', 'de'];

const translationSchema = new Schema(
  {
    source: {
      type: String,
      trim: true,
      required: true
    },

    target: {
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


    sourceLanguageHash: {
      type: String,
      trim: true,
      required: true
    },

    targetLanguageHash: {
      type: String,
      trim: true,
      required: true
    },


    status: {
      type: Boolean,
      default: 0
    },

    created: Date,
    updated: Date
  },
  {
    collection: 'translations',
    strict: true,
    autoIndex: true
  }
);


translationSchema.plugin(lastMod);

translationSchema.pre('save', function(next) {
  const self = this

  self.sourceLanguageHash = hash(self.sourceLanguage);
  self.targetLanguageHash = hash(self.targetLanguage);

  next();
});


module.exports = mongoose.model('Translations', translationSchema);