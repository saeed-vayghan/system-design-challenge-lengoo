'use strict';

const connection = require('./connection');

const { EXCHANGE_NAME, EXCHANGE_TYPE, QUEUE_NAME } = require('./constants')


const translator = async (message) => {
  const status = true;
  const error  = null;

  console.log('===> translator ===> message ==>', message);

  return {
    status,
    error
  }
};

const consume = async () => {
  const channel = await connection();

  const key = '';

  channel.prefetch(1);

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });
  const q = await channel.assertQueue(QUEUE_NAME, { exclusive: false });

  channel.bindQueue(q.queue, EXCHANGE_NAME, key);
  channel.consume(q.queue, async function(msg) {
    const message = JSON.parse((msg.content.toString('utf8')));

    if ( message.action === 'translate' ) {
      const { error } = await translator(message)

      if (error) {
        // channel.nack(msg, false);
      }

      channel.ack(msg, false);
    }

  }, { noAck: false });

  // await channel.close();
};


module.exports = consume;