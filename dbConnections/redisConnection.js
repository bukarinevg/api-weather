const { createClient } = require('redis');
const redisConfig = require('../config/redisConfig');

const redisClient = createClient(redisConfig);

const connectRedis = async () => {
  if (!redisClient.connected) {
    await redisClient.connect();
    console.log('Connected to Redis');
    console.log(redisClient);
  }
  console.log('before return')
  return redisClient;
};



module.exports = { redisClient, connectRedis };
