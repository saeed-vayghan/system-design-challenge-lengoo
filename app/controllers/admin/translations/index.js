'use strict';

const TranslationPlugin = require('../../../plugins/models/translations')
const { APIError } = require('../../../plugins/middlewares/error');


const feed = async function (req, res, next) {
  const body = req.body

  /*
    TO DO:
    
    1- Implent a layer to validate/filter input
    2- In case of large amound of input data, we need to use Batch Insert Operation
    3- Prevent from adding duplicate pair of source and target
  */

  const records = body.map(rec => {
    return {
      '_operator': req.user._id,
      'source': rec.source,
      'target': rec.target,
      'sourceLanguage': rec.sourceLanguage,
      'targetLanguage': rec.targetLanguage
    }
  })

  const { created, error } = await TranslationPlugin.create(records)

  if (error) {
    return next(new APIError(400, error.message));
  }

  return res.json(created)
};


module.exports = {
  feed
}