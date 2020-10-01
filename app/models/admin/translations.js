'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const hash     = require('../../plugins/utils/hash')
const lastMod  = require('../../plugins/models/lastMod');


/**
 * Translations Schema
 */
const languageEnum = ['en', 'de'];

const translationSchema = new Schema(
  {
    _operator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

    sourceHash: {
      type: String,
      trim: true
    },
    targetHash: {
      type: String,
      trim: true
    },

    sourceLength: Number,
    targetLength: Number,

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

  self.sourceHash = hash(self.source);
  self.targetHash = hash(self.target);

  self.sourceLength = self.source.length
  self.targetLength = self.target.length

  next();
});


module.exports = mongoose.model('Translations', translationSchema);