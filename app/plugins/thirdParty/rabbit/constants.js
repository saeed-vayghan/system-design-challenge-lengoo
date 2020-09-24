'use strict';

const EXCHANGE_NAME = 'translation';
const EXCHANGE_TYPE = 'fanout';
const QUEUE_NAME    = 'translation.translate';


module.exports = {
  EXCHANGE_NAME,
  EXCHANGE_TYPE,
  QUEUE_NAME
}