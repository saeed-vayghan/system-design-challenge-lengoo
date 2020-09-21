'use strict';

const SubtitlePlugin = require('../../plugins/models/subtitles');
const { APIError }   = require('../../plugins/middlewares/error');


const upload = async function (req, res, next) {
  /*
    curl -XPOST http://127.0.0.1:8080/api/upload \
    -F "subtitle=@/home/saeed/Pictures/desk/desk.jpg"

    req.files.subtitle: {
      name: 'desk.jpg',
      data: <Buffer ff ... 57773 more bytes>,
      size: 57823,
      encoding: '7bit',
      tempFilePath: '',
      truncated: false,
      mimetype: 'image/jpeg',
      md5: '8478e09d6eb93a9b078fe360509d23bd',
      mv: [Function: mv]
    }
  */

  const files   = req.files
  const payload = files.subtitle;

  if ( !files || Object.keys(files).length === 0 ) {
    return next(new APIError(400, 'No files were uploaded!'));
  }

  if ( payload.mimetype !== 'text' ) {
    return next(new APIError(400, 'Only TXT Files Are Supported!'));
  }

  const originalHash = '' // generate file checksum

  const data = {
    _user: req.user._id,
    fileName: payload.name,
    sourceLanguage: 'en',
    targetLanguage: 'de',
    originalHash
  }

  const { created, error } = await SubtitlePlugin.create(data);

  if (error) {
    return next(new APIError(400, error.message));
  }

  if (created) {
    const dir  = './resource/uploaded/';
    const dest = dir + created._id + '.txt';
  
    payload.mv(dest, function(err) {
      if (err) {
        return next(new APIError(400, err.message));
      }
  
      res.json({ message: 'File uploaded!' });
    });
  }
};


module.exports = {
  upload
}