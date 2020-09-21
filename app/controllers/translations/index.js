'use strict';

const Plugin       = require('../../plugins/models/translations')
const { APIError } = require('../../plugins/middlewares/error');


const find = async function (req, res, next) {
  const { record, error } = await Plugin.findOne();

  if (error) {
    return next(new APIError(400, error.message));
  }

  return res.json(record)
};


module.exports = {
  find
}