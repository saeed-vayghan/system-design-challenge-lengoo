'use strict';

const TranslationPlugin = require('../../plugins/models/translations')
const { APIError } = require('../../plugins/middlewares/error');


const findOne = async function (req, res, next) {
  const { record, error } = await TranslationPlugin.findOne();

  if (error) {
    return next(new APIError(400, error.message));
  }

  return res.json(record)
};


module.exports = {
  findOne
}