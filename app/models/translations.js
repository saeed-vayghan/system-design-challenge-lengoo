'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Translations Schema
 */
const languageEnum = ['en', 'de'];

const translationschema = new Schema(
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


    targetLanguageHash: {
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

const lastMod = function (schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      this.created = new Date();
    }

    this.updated = new Date();

    next();
  });
};

translationschema.plugin(lastMod);

// translationschema.index({ key: 1 }, { unique: true });
// OR db.translations.createIndex({ key: 1 }, { background: true, unique: true })

translationschema.pre('save', function(next) {
  // this.sourceLanguageHash = hash(this.sourceLanguage)
  // this.targetLanguageHash = hash(this.targetLanguage)

  next();
});

// translationschema.post('save', function(doc) {
// });

// translationschema.post('remove', function(doc) {
// });

module.exports = mongoose.model('Translations', translationschema);