'use strict';

const sanitize = require('../../utils/sanitizer');
const mongoose = require('mongoose');

const Model = mongoose.model('Translations');



const create = async function (data) {
  let error   = null;
  let created = null;


  /** @type {IRecord} */
  const sampleData = {
    name: 'number',
    score: 10,
    _id: 'id',
    emails: ['str']
  }

  try {
    created = await Model.create(sanitize(data));
  } catch (ex) {
    error = ex;
  }

  return {
    created,
    error
  };
};

const findOne = async function (query) {
  let error  = null;
  let record = null;

  try {
    record = await Model.findOne({});
  } catch (ex) {
    error = ex;
  }

  return {
    record,
    error
  };
};

const findByQuery = async function (query) {
  let error = null;
  let Record  = null;

  try {
    Record = await Model.findOne({ query: sanitize(query) });
  } catch (ex) {
    error = ex;
  }

  return {
    Record,
    error
  };
};

/**
 * @param {ObjectId} _id
 */
const deleteOne = async function (_id) {
  let error = null;

  try {
    await Model.deleteOne({ _id });
  } catch (ex) {
    error = ex;
  }

  return {
    error
  };
};


module.exports = {
  create,
  findOne,
  findByQuery,
  deleteOne
}