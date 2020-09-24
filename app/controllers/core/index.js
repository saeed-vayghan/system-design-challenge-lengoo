'use strict';

const producer = require('../../plugins/thirdParty/rabbit/producer')

exports.info = async function (req, res, next) {

  await producer({ action: 'translate', key: 'translate' });
  await producer({ action: 'report', key: 'report' });

  return await res.json({ message: 'Welcome to the API server!!' });
};