'use strict';

const util = require('util');

const SubtitlePlugin = require('../../../plugins/models/subtitles');
const { APIError }   = require('../../../plugins/middlewares/error');
const producer       = require('../../../plugins/thirdParty/rabbit/producer');


/**
 * @api {post} /api/translations Upload a subtitle file
 * @apiVersion 1.0.0
 * @apiName uploadSubtitle
 * @apiGroup User-Action
 * @apiPermission User
 *
 * @apiUse authenticateHeader
 *
 * @apiParam {String} fileName
 * @apiParam {String} sourceLanguage
 * @apiParam {String} targetLanguage
 *
 * @apiParamExample {json} Request:
 *    /api/translations
      -F "fileName=Matrix-1999-en.txt" -F "sourceLanguage=en" -F "targetLanguage=de" -F "subtitle=@/path/to/Matrix-1999-en.txt"
 *
 * @apiSuccess {String} status Response status
 *
 * @apiSuccessExample {json} Response-Structure:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "success"
 *    }
 *
 * @apiError {String} status Error status
 * @apiError {String} message Error message
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 db related error
 *     {
 *       "status": "failed",
 *       "message": "error-message"
 *     }
 */
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

    // Simulate IO delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    const move = util.promisify(payload.mv);

    try {
      await move(dest);

      const msg = {
        action: 'translate',
        _subtitle: created._id
      }

      // Push a message to RabbitMQ to translate and report back to the user
      await producer(msg, 'translation');

      res.json({ message: 'File uploaded!' });

    } catch (ex) {

      return next(new APIError(400, ex.message));
    }
  }
};


module.exports = {
  upload
}