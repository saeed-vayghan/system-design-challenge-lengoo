'use strict';

const producer = require('../../plugins/thirdParty/rabbit/producer')

exports.info = async function (req, res, next) {

  await producer({ key: 'val' });

  return await res.json({ message: 'Welcome to the API server!!' });
};