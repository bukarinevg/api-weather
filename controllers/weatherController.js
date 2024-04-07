const GeoCodingService = require('../services/GeoCodingService');
const WeatherService = require('../services/WeatherService');
const { getLocationFromIP } = require('../services/LocationService');

module.exports.get_weather = async(req, res) => {
    try {
      let location = req.params.location;
  
      if (!location) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // Use a service like ipapi to get the location from the IP address
        location = await getLocationFromIP(ip);
      }
        console.log(location);
        const coordinates = await GeoCodingService.getData(location);
        const weather = await WeatherService.getData(coordinates.lat, coordinates.lon);
        res.json({location: coordinates.display_name, data:weather, cloud: true});
      }
      catch (error) {
        const status = error.status || 500; // Default to 500 if error.status is not defined
        res.status(status).json({ error: error.message })
      }
}