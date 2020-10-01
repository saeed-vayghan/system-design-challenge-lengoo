'use strict';

const config = require('../../config');

const UserPlugin     = require('../../app/plugins/models/users');
const SubtitlePlugin = require('../../app/plugins/models/subtitles');
const sendEmail      = require('../../app/plugins/utils/mailer');


const reporter = async (message) => {
  const subtitleResult = await SubtitlePlugin.findById(message._subtitle); // { sub, error }
  const sub = subtitleResult.sub;

  const userResult = await UserPlugin.findById(subtitleResult.sub._user); // { user, error }
  const user = userResult.user;

  const from    = config.gmail.from;
  const to      = user.email;
  const subject = 'Your Subtitle Has Been Translated.';
  const text    = 'Dear User! Please check the attchament to download the file.';
  const path    = `./resource/translated/${sub._id}.txt`;

  const filename    = `${sub.fileName}__${sub.targetLanguage}.txt`;
  const attachments = [{ filename, path }];

  const mailOptions = { from, to, subject, text, attachments };  

  // TO DO: Dump sent email report
  const result = await sendEmail(mailOptions)

  // Set as reported
  await SubtitlePlugin.updateOne(sub._id, { $set: { reported: true } });

  console.log('===> Reporter Done ===> Result ==>', result);

  // Simulate IO delay
  await new Promise((resolve) => setTimeout(resolve, 10000));
};


module.exports = {
  reporter
}