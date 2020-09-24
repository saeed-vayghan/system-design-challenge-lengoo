'use strict';

const SubtitlePlugin = require('../../app/plugins/models/subtitles');
const producer       = require('../../app/plugins/thirdParty/rabbit/producer')


const translator = async (message) => {
  const result = await SubtitlePlugin.findById(message._subtitle); // { sub, error }

  console.log('===> Translator ===> message ==>', message, '===> result', result);

  // Simulate IO delay
  await new Promise((resolve) => setTimeout(resolve, 1000));


  // Translate document
  // ....


  // Push a new message to Rabbit in order to email the translated document to user

  const msg = {
    action: 'report',
    _subtitle: message._subtitle
  };

  await producer(msg, 'reporting');
};



module.exports = {
  translator
}