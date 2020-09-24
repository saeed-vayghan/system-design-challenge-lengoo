'use strict';

const connection = require('./connection');

const EXCHANGE_NAME = 'translation';
const EXCHANGE_TYPE = 'fanout';
const QUEUE_NAME    = 'translation.translate';


const consume = async () => {
  const channel = await connection();

  const key = '';

  channel.prefetch(1);

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });
  const q = await channel.assertQueue(QUEUE_NAME, { exclusive: false });

  channel.bindQueue(q.queue, EXCHANGE_NAME, key);
  channel.consume(q.queue, async function(msg) {
    
    const body = JSON.parse((msg.content.toString('utf8')));

    console.log('===> message body ==>', body)

    channel.ack(msg, false);
    // channel.nack(msg, false);

  }, { noAck: false });

  // await channel.close();
};


module.exports = consume;