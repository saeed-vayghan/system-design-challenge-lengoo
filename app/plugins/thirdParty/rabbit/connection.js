'use strict';

const config = require('../../../../config');
const amqp   = require('amqplib');

const RABBIT_SERVER = config.rabbit

let conn = null;


const connection = async () => {
  if (!conn) {
    conn = await amqp.connect(RABBIT_SERVER);
  }

  const channel = await conn.createChannel();

  return channel
}


module.exports = connection