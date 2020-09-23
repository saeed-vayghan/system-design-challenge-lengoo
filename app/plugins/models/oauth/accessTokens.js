'use strict';

const sanitize    = require('../../utils/sanitizer');
const mongoose    = require('mongoose');
const AccessToken = mongoose.model('AccessToken');

const { tokenGen } = require('../../utils/randomString');


const createToken = async (user, client) => {
  const currentUnixTS = new Date().getTime();

  /** @type {IAccessToken>} */
  const aToken = new AccessToken();

  aToken._user   = user._id; 
  aToken.client  = client;
  aToken.token   = tokenGen.generate(24);
  aToken.created = currentUnixTS;

  await aToken.save();

  return aToken
};

const findOneByQuery = async (query) => {
  return await AccessToken.findOne(sanitize(query))
};

const deleteOneById = async (_id) => {
  return await AccessToken.deleteOne({ _id })
};


module.exports = {
  createToken,
  findOneByQuery,
  deleteOneById
}