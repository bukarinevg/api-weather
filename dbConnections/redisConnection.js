const { createClient } = require('redis');
const redisConfig = require('../config/redisConfig');

const client = createClient(redisConfig);

const connectRedis = async () => {
  if (!client.connected) {
    await client.connect();
  }
};

client.on('error', function (error) {
  console.error('Redis error:', error);
});

client.on('connect', function() {
  console.log('Connected to Redis');
});

module.exports = { client, connectRedis };
