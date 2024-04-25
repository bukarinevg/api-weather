const mongoConfig = {
    uri: process.env.MONGODB_URI,
    port: process.env.PORT || 5000
  };
  
module.exports =  mongoConfig;