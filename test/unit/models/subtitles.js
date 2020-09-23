'use strict';

const { expect } = require('chai');
const ObjectID   = require('mongodb').ObjectID;

const SubtitlePlugin = require('../../../app/plugins/models/subtitles');

let createRecord = null


describe('#Testing Subtitles Model', function() {
  it('should not be able to create a Subtitles record', async function() {

    const data = {
      fileName: 'fileName',
      sourceLanguage: 'en',
      targetLanguage: 'de'
    }
  
    const { error } = await SubtitlePlugin.create(data);
  
    if (error) {
      expect(error.message).to.be.equal("Subtitles validation failed: _user: Path `_user` is required.")
    }
  });

  it('should create a Subtitles record', async function() {
    const _user = new ObjectID();

    const data = {
      _user,
      fileName: 'fileName',
      sourceLanguage: 'en',
      targetLanguage: 'de'
    }

    const { created } = await SubtitlePlugin.create(data);
  
    if (created) {
      expect(created._user).to.be.equal(_user);

      createRecord = created
    }
  });

  it('should delete a Subtitles by id', async function() {
    await SubtitlePlugin.deleteOne(createRecord._id)

    const result = await SubtitlePlugin.findOne()

    expect(result.record).to.be.equal(null);
    expect(result.error).to.be.equal(null);
  });
});