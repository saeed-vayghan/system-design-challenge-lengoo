'use strict';

const util = require('util');

const SubtitlePlugin = require('../../../plugins/models/subtitles');
const { APIError }   = require('../../../plugins/middlewares/error');


const upload = async function (req, res, next) {
  const body    = req.body
  const files   = req.files
  const payload = files.subtitle;

  if (!body.fileName) {
    return next(new APIError(400, 'FileName Is Required!'));
  }

  if (!body.sourceLanguage) {
    return next(new APIError(400, 'Source Language Is Required!'));
  }

  if (!body.targetLanguage) {
    return next(new APIError(400, 'Target Language Is Required!'));
  }


  if ( !files || Object.keys(files).length === 0 ) {
    return next(new APIError(400, 'No files were uploaded!'));
  }

  if ( payload.mimetype !== 'text/plain' ) {
    return next(new APIError(400, 'Only .txt Files Are Supported!'));
  }

  const data = {
    _user: req.user._id,
    fileName: body.fileName,
    sourceLanguage: body.sourceLanguage,
    targetLanguage: body.targetLanguage
  }

  const { created, error } = await SubtitlePlugin.create(data);

  if (error) {
    return next(new APIError(400, error.message));
  }

  if (created) {
    const dir  = './resource/uploaded/';
    const dest = dir + created._id + '.txt';
  
    const move = util.promisify(payload.mv);

    try {
      await move(dest);

      // const msg = {
      //   action: 'translate',
      //   _subtitle: created._id
      // }

      // Push a message to RabbitMQ to translate and report back to the user

      res.json({ message: 'File uploaded!' });

    } catch (ex) {

      return next(new APIError(400, ex.message));
    }
  }
};


module.exports = {
  upload
}