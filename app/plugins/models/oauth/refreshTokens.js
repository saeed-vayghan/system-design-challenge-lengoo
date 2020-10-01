'use strict';

const sanitize     = require('../../utils/sanitizer');
const mongoose     = require('mongoose');
const RefreshToken = mongoose.model('RefreshToken');

const { tokenGen } = require('../../utils/randomString');


/**
 * @param {String} client
 * @param {Object} user
 */
const createToken = async (user, client) => {
  const currentUnixTS = new Date().getTime();

  /** @type {IRefreshToken>} */
  const rToken = new RefreshToken();

  rToken._user   = user._id; 
  rToken.client  = client;
  rToken.token   = tokenGen.generate(24);
  rToken.created = currentUnixTS;

  await rToken.save();

  return rToken
};


/**
 * @param {Object} query
 */
const findOneByQuery = async (query) => {
  return await RefreshToken.findOne(sanitize(query))
};


/**
 * @param {ObjectId} _id
 */
const deleteOneById = async (_id) => {
  return await RefreshToken.deleteOne({ _id })
};


module.exports = {
  createToken,
  findOneByQuery,
  deleteOneById
}