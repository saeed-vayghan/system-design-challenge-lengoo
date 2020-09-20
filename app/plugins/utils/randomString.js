'use strict';

const randtoken = require('rand-token');

const chars      = '0123456789abcdefghijklmnopqrstuvwxyz';
const alphaChars = 'abcdefghijklmnopqrstuvwxyz';

const tokenGen = randtoken.generator({ chars: chars });
const alphaGen = randtoken.generator({ chars: alphaChars });



module.exports = {
  tokenGen,
  alphaGen
};