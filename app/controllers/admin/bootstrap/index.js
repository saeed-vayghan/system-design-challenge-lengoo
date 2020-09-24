'use strict';

const ClientPlugin = require('../../../plugins/models/oauth/client')
const { APIError } = require('../../../plugins/middlewares/error');


const start = async function (req, res, next) {
  const { result, error } = await ClientPlugin.createClients()

  if (error) {
    return next(new APIError(500, error.message));
  }

  return res.json(result)
};


module.exports = {
  start
}