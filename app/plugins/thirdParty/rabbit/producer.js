'use strict';

const connection = require('./connection');

const { EXCHANGE_NAME, EXCHANGE_TYPE } = require('./constants')


const produce = async (msg) => {
  const channel = await connection();

  const key    = '';
  const buffer = new Buffer(JSON.stringify(msg));

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true, persistent: true });
  await channel.publish(EXCHANGE_NAME, key, buffer);
  await channel.close();
};


module.exports = produce;