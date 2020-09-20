'use strict';

const config      = require('../../../config');
const mongoose    = require('mongoose');
const User        = mongoose.model('User');
const AccessToken = mongoose.model('AccessToken');

const { tokens: tokensClient } = require('../../plugins/thirdParty/redis');

const { promisify } = require("util");
const get = promisify(tokensClient.get.bind(tokensClient))



const getUser = async (userId) => {
  const selectedFields = '_id displayName email roles created updated';

  return await User.findById(userId, selectedFields)
};

const getTokenObj = async (token) => {
  const redisKey = 'accessTokens.' + token;

  const doc = await get(redisKey)

  if (doc) {
    return JSON.parse(doc);
  }

  return await AccessToken.findOne({ token: token })
};

const authenticate = async (req, res, next) => {
  const token  = req.headers['authorization'] || req.headers['Authorization'];
  const client = req.headers['client'];

  const aToken = await getTokenObj(token)

  if (!aToken) {
    return res.status(401).json({ status: 'failed', message: 'token-not-fount' });
  }

  if (aToken.client !== client) {
    return res.status(403).json({ status: 'failed', message: 'bad-client' });
  }

  if ( Math.round((Date.now()-aToken.created)/1000) > config.tokenExpireIn ) {
    await aToken.remove();
    return res.status(401).json({ status: 'failed', message: 'token-expired' });
  }

  const currentUser = await getUser(aToken._user)

  if (!currentUser) {
    return res.status(404).json({ status: 'failed', message: 'user-not-fount' }); 
  }

  req.user = currentUser;

  return next();
};



module.exports = authenticate;