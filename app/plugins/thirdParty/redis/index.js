'use strict';

const config = require('../../../../config');
const redis  = require('redis');

const url = config.redis.server

const tokens     = redis.createClient({ url});
const models     = redis.createClient({ url});
const monitoring = redis.createClient({ url});  


tokens.select(config.redisDBs.serverOne.tokens.db);
models.select(config.redisDBs.serverOne.models.db);
monitoring.select(config.redisDBs.serverOne.monitoring.db);


tokens.on("error", function (err) {
  console.log("redis tokens client failed:", err);
});

models.on("error", function (err) {
  console.log("redis models client failed:", err);
});

monitoring.on("error", function (err) {
  console.log("redis monitoring client failed:", err);
});


module.exports = {
  tokens,
  models,
  monitoring
}