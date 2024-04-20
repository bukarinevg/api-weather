const redisConfig = {
    password: process.env.REDIS_PASS,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
  };
  
module.exports= redisConfig;
  