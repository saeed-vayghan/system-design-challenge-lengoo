'use strict';

const TranslationPlugin = require('../../../plugins/models/translations')
const { APIError } = require('../../../plugins/middlewares/error');


const feed = async function (req, res, next) {

  return res.json(req.body)

};


module.exports = {
  feed
}