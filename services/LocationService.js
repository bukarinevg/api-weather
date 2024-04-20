const axios = require('axios');

module.exports.getLocationFromIP = async (ip) => {
  return new Promise((resolve, reject) => {
    // Try to get the result from the cache
    client.get(ip, async (err, result) => {
      if (err) {
        reject(err);
      } else if (result) {
        console.log('Cache hit');
        resolve(result);
      } else {
        // Otherwise, get the result and store it in the cache
        const response = await axios.get(`https://ipapi.co/${ip}/json/`);
        const location = response.data.city;
        client.set(ip, location, 'EX', 3600); // Cache for 1 hour
        resolve(location);
      }
    });
  });
}