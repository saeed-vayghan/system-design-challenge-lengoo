'use strict';

const fs       = require('fs');
const readline = require('readline');

const SubtitlePlugin = require('../../app/plugins/models/subtitles');
const producer       = require('../../app/plugins/thirdParty/rabbit/producer')


const parser = async (file) => {
  const output = [];

  const fileStream = fs.createReadStream(file);

  const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNum = 1;

  for await (const line of reader) {

    let timeBlock = '';
    let textBlock = '';
    
    let timePointer = false;
    let textPointer = false;

    for (let i = 0; i < line.length; i ++) {
      const char = line[i];

      if ( textPointer ) {
        textBlock += char;
      }

      if ( char === '[' || timePointer ) {
        timePointer = true;
        timeBlock += char;
      }
      
      if ( char === ']' ) {
        timePointer = false;
        textPointer = true;
      }
    }

    textBlock = textBlock.trim();

    output.push({ lineNum, line, timeBlock, textBlock });

    lineNum ++;
  }

  return output;
};

const translator = async (message) => {
  const subtitleResult = await SubtitlePlugin.findById(message._subtitle); // { sub, error }
  const sub = subtitleResult.sub;

  console.log('===> Translator ===> message ==>', message, '===> result', subtitleResult);

  // Simulate IO delay
  await new Promise((resolve) => setTimeout(resolve, 1000));



  // Translate document
  // ....

  const src  = `./resource/uploaded/${sub._id}.txt`;
  const dest = `./resource/translated/${sub._id}.txt`;

  const output = await parser(src);

  console.log('===> Translator ===> Src ==>', src);
  console.log('===> Translator ===> Dest ==>', dest);
  console.log('===> Translator ===> Output ==>', output);



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