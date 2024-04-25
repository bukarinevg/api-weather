const { createClient } = require('redis');
const redisConfig = require('../config/redisConfig');

const redisClient = createClient(redisConfig);

const connectRedis = async () => {
  if (!redisClient.connected) {
    await redisClient.connect();
    console.log('Connected to Redis');
  }
  return redisClient;
};



module.exports = { redisClient, connectRedis };
 