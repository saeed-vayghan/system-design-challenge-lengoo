'use strict';

const SubtitlePlugin = require('../../app/plugins/models/subtitles');
const producer       = require('../../app/plugins/thirdParty/rabbit/producer')


const translator = async (message) => {
  const status = true;
  const error  = null;

  const result = await SubtitlePlugin.findOne();

  console.log('===> translator ===> message ==>', message, '===> result', result);

  return {
    status,
    error
  }
};



module.exports = {
  translator
}