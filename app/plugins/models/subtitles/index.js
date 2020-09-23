'use strict';

const sanitize = require('../../utils/sanitizer');
const mongoose = require('mongoose');
const Subtitle = mongoose.model('Subtitles');


const create = async function (data) {
  let error   = null;
  let created = null;

  const sub = new Subtitle(data);

  try {
    created = await Subtitle.create(sub);
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
    record = await Subtitle.findOne({});
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
    Record = await Subtitle.findOne({ query: sanitize(query) });
  } catch (ex) {
    error = ex;
  }

  return {
    Record,
    error
  };
};

const deleteOne = async function (_id) {
  let error = null;

  try {
    await Subtitle.deleteOne({ _id });
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