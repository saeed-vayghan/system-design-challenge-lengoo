'use strict';

const connection = require('./connection');

const { translation, reporting } = require('./constants');


const consumer = async (handler, ex) => {
  const channel = await connection();
  channel.prefetch(1);

  const conf = ( ex === 'reporting' ) ? reporting : translation;

  await channel.assertExchange(conf.exchange, conf.exchange_TYPE, { durable: true });
  const q = await channel.assertQueue(conf.queue, { exclusive: false });

  channel.bindQueue(q.queue, conf.exchange, conf.key);

  channel.consume(q.queue, async function(msg) {
    const message = JSON.parse((msg.content.toString('utf8')));

    try {
      await handler(message);
      channel.ack(msg, false);

    } catch (ex) {

      console.log('Concumer Failed!', ex);
      channel.nack(msg, false);
    }

  }, { noAck: false });

  // await channel.close();
};

const consume = async (workers) => {
  await consumer(workers.translator, 'translation');
  await consumer(workers.reporter, 'reporting');
};


module.exports = consume;