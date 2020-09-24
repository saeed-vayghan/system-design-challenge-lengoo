'use strict';


module.exports = {
  translation: {
    exchange: 'translation',
    exchange_TYPE: 'fanout',
    queue: 'translation.translate',
    key: ''
  },

  reporting: {
    exchange: 'reporting',
    exchange_TYPE: 'fanout',
    queue: 'reporting.email',
    key: ''
  }
}