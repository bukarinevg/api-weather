const axios = require('axios');

module.exports.getLocationFromIP = async (ip) => {
  const response = await axios.get(`https://ipapi.co/${ip}/json/`);
  return response.data.city;
}

