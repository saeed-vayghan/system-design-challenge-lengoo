'use strict';

const SubtitlePlugin = require('../../app/plugins/models/subtitles');
// const producer    = require('../../app/plugins/thirdParty/rabbit/producer')


const translator = async (message) => {
  const result = await SubtitlePlugin.findById(message._subtitle); // { sub, error }

  console.log('===> translator ===> message ==>', message, '===> result', result);


  /*
    Translate document
    Then push a new message to Rabbit in order to email the translated document to user
    producer({
      action: 'report',
      _subtitle: message._subtitle
    })
  */
};



module.exports = {
  translator
}