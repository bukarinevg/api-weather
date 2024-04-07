const GeoCodingService = require('../services/GeoCodingService');
const WeatherService = require('../services/WeatherService');
const { getLocationFromIP } = require('../services/LocationService');

module.exports.get_weather = async(req, res) => {
    try {
      let location = req.params.location;
  
      if (!location) {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        ip = ip.split(',')[0];
        location = await getLocationFromIP(ip);
        console.log(ip);
      }
        console.log(location);
        const coordinates = await GeoCodingService.getData(location);
        const weather = await WeatherService.getData(coordinates.lat, coordinates.lon);
        res.json({location: coordinates.display_name, data:weather, cloud: true});
      }
      catch (error) {
        console.log(error);
        const status = error.status || 500; 
        res.status(status).json({ error: error.message })
      }
}