'use strict';

const recordPlugin = require('../plugins/models/translations')


const find = async function (req, res, next) {
  const { record, error } = await recordPlugin.findOne();

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.json(record)
};


module.exports = {
  find
}