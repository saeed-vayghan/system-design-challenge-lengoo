'use strict';

const mongoose = require('mongoose');
const Subtitle = mongoose.model('Subtitles');



/**
 * @param {Object} data
 */
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


/**
 * @param {ObjectId} _id
 */
const findById = async function (_id) {
  let error = null;
  let sub   = null;

  try {
    sub = await Subtitle.findOne({ _id });
  } catch (ex) {
    error = ex;
  }

  return {
    sub,
    error
  };
};


/**
 * @param {ObjectId} _id
 * @param {Object} query
 */
const updateOne = async function (_id, query) {
  let error  = null;
  let record = null;

  try {
    record = await Subtitle.updateOne({ _id }, query);
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
  findById,
  updateOne,
  deleteOne
}