'use strict';

const md5 = require('md5');

const mongoose = require('mongoose');
const User     = mongoose.model('User');

const sanitize     = require('../../utils/sanitizer');
const { alphaGen } = require('../../utils/randomString');


/**
 * @param {Object} body
 */
const createUser = async (body) => {
  const user = new User();

  user.salt = alphaGen.generate(8);
  user.hashedPassword = md5(user.salt + body.password);
  user.displayName = body.displayName;
  user.email       = body.email;

  await user.save();

  return user.toObject();
};


/**
 * @param {ObjectId} _id
 */
const findById = async function (_id) {
  let error  = null;
  let user = null;

  try {
    user = await User.findOne({ _id });
  } catch (ex) {
    error = ex;
  }

  return {
    user,
    error
  };
};


/**
 * @param {Object} query
 */
const findOneByQuery = async (query) => {
  return await User.findOne(sanitize(query))
};


module.exports = {
  createUser,
  findById,
  findOneByQuery,
}