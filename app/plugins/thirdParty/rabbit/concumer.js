'use strict';

const connection = require('./connection');

const { EXCHANGE_NAME, EXCHANGE_TYPE, QUEUE_NAME } = require('./constants')


const consume = async (workers) => {
  const channel = await connection();

  const key = '';

  channel.prefetch(1);

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });
  const q = await channel.assertQueue(QUEUE_NAME, { exclusive: false });

  channel.bindQueue(q.queue, EXCHANGE_NAME, key);

  channel.consume(q.queue, async function(msg) {
    const message = JSON.parse((msg.content.toString('utf8')));

    // Simulate IO delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if ( message.action === 'translate' ) {
      const { error } = await workers.translator(message)

      if (error) {
        // channel.nack(msg, false);
      }
    }

    if ( message.action === 'report' ) {
      const { error } = await workers.reporter(message)

      if (error) {
        // channel.nack(msg, false);
      }
    }

    channel.ack(msg, false);

  }, { noAck: false });

  // await channel.close();
};


module.exports = consume;