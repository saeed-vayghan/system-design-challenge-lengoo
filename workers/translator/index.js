'use strict';

const fs       = require('fs');
const readline = require('readline');

const SubtitlePlugin    = require('../../app/plugins/models/subtitles');
const TranslationPlugin = require('../../app/plugins/models/translations');

const levenshtein = require('../../app/plugins/utils/levenshtein');
const producer    = require('../../app/plugins/thirdParty/rabbit/producer')


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

const translate = async (input, query) => {
  const sourceLength = input.textBlock.length;
  const min = ( (sourceLength - 5) < 0 ) ? 0 : (sourceLength - 5);
  const max = sourceLength + 5;

  query['$and'] = [{ sourceLength: { $lte: Number(max) } }, { sourceLength: { $gte: Number(min) } }];

  const result = await TranslationPlugin.findByQuery(query);

  let target = null;

  for ( const record of result ) {
    const translation = record.target
    const distance    = levenshtein(input.textBlock, record.source).distance

    if ( distance <= 5 ) {

      if (target) {

        if ( distance <= target.distance ) {
          target = { distance, translation };
        }

      } else {

        target = { distance, translation };
      }
    }
  }

  return target
};

const process = async (sub) => {
  const src = `./resource/uploaded/${sub._id}.txt`;

  const sourceLanguage = sub.sourceLanguage;
  const targetLanguage = sub.targetLanguage;

  const query = {
    sourceLanguage,
    targetLanguage
  };

  const output = await parser(src);

  for (const obj of output) {
    /*
      target =? { distance: 2, translation: 'I am Arwen - Ive come to help you' }
    */
    const target = await translate(obj, query);

    if (target) {
      obj['translation'] = target.translation
    } else {
      obj['translation'] = target.textBlock
    }
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
  const output = await process(sub);

  const dest   = `./resource/translated/${sub._id}.txt`;
  const writer = fs.createWriteStream(dest, { flags: 'w' })
  
  for (const obj of output) {
    const line = `${obj.lineNum} ${obj.timeBlock} ${obj.translation}\n`;
    writer.write(line);
  }
  writer.close();


  // Set as translated
  await SubtitlePlugin.updateOne(sub._id, { $set: { status : 'translated' } });

  // Push a new message to Rabbit in order to email the translated document to user
  const msg = {
    action: 'report',
    _subtitle: message._subtitle
  };

  console.log('===> Translator Done ===> Result ==>', output);

  await producer(msg, 'reporting');
};



module.exports = {
  translator
}