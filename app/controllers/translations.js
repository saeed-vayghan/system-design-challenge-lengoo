'use strict';

const recordPlugin = require('../plugins/models/translations')


const find = async function (req, res, next) {
  const { record, error } = await recordPlugin.findOne();

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  return res.json(record)
};

const upload = async function (req, res, next) {
  console.log('---> req.files --->', req.files)

  /*
    curl -XPOST http://127.0.0.1:8080/api/upload \
    -F "userid=1" -F "comment=This is a subtitle file" -F "subtitle=@/home/saeed/Pictures/desk/desk.jpg"

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


  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.subtitle;

  const dir  = './resource/uploaded/';
  const dest = dir + req.files.subtitle.name;

  uploadedFile.mv(dest, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ message: 'File uploaded!' });
  });
}


module.exports = {
  find,
  upload
}