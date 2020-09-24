'use strict';

const UserPlugin     = require('../../app/plugins/models/users');
const SubtitlePlugin = require('../../app/plugins/models/subtitles');
const sendEmail      = require('../../app/plugins/utils/mailer');


const reporter = async (message) => {
  console.log('===> reporter ===> message ==>', message);

  const subtitleResult = await SubtitlePlugin.findById(message._subtitle); // { sub, error }
  const userResult     = await UserPlugin.findById(message._subtitle); // { user, error }

  const dir  = './resource/uploaded/';
  const path = dir + subtitleResult.sub._id + '.txt';

  const mailOptions = {
    from: 'no-reply-translator@gmail.com',
    to: userResult.user.email,
    subject: 'You Subtitle Has Been Translated.',
    text: 'Dear User! Please check the attchament to download the file.',
  
    attachments: [
      // { // binary buffer as an attachment
      //   filename: 'translated-1.txt',
      //   content: new Buffer('hello world!','utf-8')
      // },
  
      {  // file on disk as an attachment
        filename: 'translated-1.txt',
        path
      }
  
      // { // filename and content type is derived from path
      //   path: '/path/to/translated-3.txt'
      // }
    ]
  };
  
  const result = await sendEmail(mailOptions)

  console.log('===> reporter ===> result ==>', result);
};


module.exports = {
  reporter
}