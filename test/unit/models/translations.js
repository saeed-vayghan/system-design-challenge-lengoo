'use strict';

const { expect } = require('chai');
const ObjectID   = require('mongodb').ObjectID;

const TranslationPlugin = require('../../../app/plugins/models/translations');

const sampleRecords = [
  {
    'source': 'Hello World',
    'target': 'Hallo Welt',
    'sourceLanguage': 'en',
    'targetLanguage': 'de'
  },
  {
    'source': 'Hello guys',
    'target': 'Hallo Leute',
    'sourceLanguage': 'en',
    'targetLanguage': 'de'
  },
  {
    'source': 'I walk to the supermarket',
    'target': 'Ich gehe zum Supermarkt.',
    'sourceLanguage': 'en',
    'targetLanguage': 'de'
  }
]

let createRecords = []


describe('#Testing Translations Model', function() {
  it('should not be able to create a Translations record', async function() {
    const records = sampleRecords.map(rec => {
      return {
        'source': rec.source,
        'target': rec.target,
        'sourceLanguage': rec.sourceLanguage,
        'targetLanguage': rec.targetLanguage
      }
    })
  
    const { error } = await TranslationPlugin.create(records)
  
    if (error) {
      expect(error.message).to.be.equal('Translations validation failed: _operator: Path `_operator` is required.')
    }
  });

  it('should create a Translations record', async function() {
    const _operator = new ObjectID();

    const records = sampleRecords.map(rec => {
      return {
        _operator,
        'source': rec.source,
        'target': rec.target,
        'sourceLanguage': rec.sourceLanguage,
        'targetLanguage': rec.targetLanguage
      }
    })
  
    const { created } = await TranslationPlugin.create(records)
  
    if (created) {
      expect(created.length).to.be.equal(3);

      createRecords = created
    }
  });

  it('should delete a Translations by id', async function() {
    for ( const record of createRecords ) {
      await TranslationPlugin.deleteOne(record._id)
    }

    const result = await TranslationPlugin.findOne()

    expect(result.record).to.be.equal(null);
    expect(result.error).to.be.equal(null);
  });
});