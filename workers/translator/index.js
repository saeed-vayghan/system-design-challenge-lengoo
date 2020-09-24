'use strict';

const SubtitlePlugin = require('../../app/plugins/models/subtitles');
// const producer    = require('../../app/plugins/thirdParty/rabbit/producer')


const translator = async (message) => {
  const status = true;
  const error  = null;

  const result = await SubtitlePlugin.findById(message._subtitle);

  console.log('===> translator ===> message ==>', message, '===> result', result);


  // Translate document
  // Then push a new message to Rabbit in order to email the translated document to user
  // producer({ ... })


  return {
    status,
    error
  }
};



module.exports = {
  translator
}