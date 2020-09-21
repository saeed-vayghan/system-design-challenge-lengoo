'use strict';

const sanitize = require('../../utils/sanitizer');
const mongoose = require('mongoose');
const Translation = mongoose.model('Translations');


const create = async function (data) {
  let error   = null;
  let created = null;


  // /** @type {IRecord} */
  // const sampleData = {
  //   name: 'number',
  //   score: 10,
  //   _id: 'id',
  //   emails: ['str']
  // }

  try {
    created = await Translation.create(sanitize(data));
  } catch (ex) {
    error = ex;
  }

  return {
    created,
    error
  };
};


const findOne = async function () {
  let error  = null;
  let record = null;

  try {
    record = await Translation.findOne({});
  } catch (ex) {
    error = ex;
  }

  return {
    record,
    error
  };
};


/**
 * @param {ObjectId} _id
 */
const deleteOne = async function (_id) {
  let error = null;

  try {
    await Translation.deleteOne({ _id });
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
  deleteOne
}