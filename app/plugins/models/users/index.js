'use strict';

const md5 = require('md5');

const mongoose = require('mongoose');
const User     = mongoose.model('User');

const sanitize     = require('../../utils/sanitizer');
const { alphaGen } = require('../../utils/randomString');


const createUser = async (body) => {
  const user = new User();

  user.salt = alphaGen.generate(8);
  user.hashedPassword = md5(user.salt + body.password);
  user.displayName = body.displayName;
  user.email       = body.email;

  await user.save();

  return user.toObject();
};


const findOneByQuery = async (query) => {
  return await User.findOne(sanitize(query))
};


module.exports = {
  createUser,
  findOneByQuery,
}