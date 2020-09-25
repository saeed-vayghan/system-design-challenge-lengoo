'use strict';

const connection = require('./connection');

const { translation, reporting } = require('./constants');


const produce = async (msg, ex) => {
  const channel = await connection();

  const conf = ( ex === 'reporting' ) ? reporting : translation;

  const buffer = new Buffer(JSON.stringify(msg));

  await channel.assertExchange(conf.exchange, conf.exchange_TYPE, { durable: true, persistent: true });
  await channel.publish(conf.exchange, conf.key, buffer);
  await channel.close();
};


module.exports = produce;