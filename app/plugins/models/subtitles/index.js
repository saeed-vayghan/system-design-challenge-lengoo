'use strict';

const sanitize = require('../../utils/sanitizer');
const mongoose = require('mongoose');

const Model = mongoose.model('Subtitles');



const create = async function (data) {
  let error   = null;
  let created = null;

  const sub = new Model(data);

  try {
    created = await Model.create(sanitize(sub));
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


module.exports = {
  create,
  findOne,
  findByQuery
}