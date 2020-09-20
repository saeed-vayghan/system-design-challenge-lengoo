'use strict';

const config = require('../../../../config');
const redis  = require('redis');

const url = config.redis.server

const tokens     = redis.createClient({ url});
const models     = redis.createClient({ url});
const monitoring = redis.createClient({ url});  

const shutdown = () => {
  tokens.quit()
  models.quit()
  monitoring.quit()
}


tokens.select(config.redis.databases.tokens.db);
models.select(config.redis.databases.models.db);
monitoring.select(config.redis.databases.monitoring.db);


tokens.on("error", function (err) {
  console.log("redis tokens client failed:", err);
});

models.on("error", function (err) {
  console.log("redis models client failed:", err);
});

monitoring.on("error", function (err) {
  console.log("redis monitoring client failed:", err);
});


process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)



module.exports = {
  tokens,
  models,
  monitoring
}