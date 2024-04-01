const GeoCodingService = require('../services/GeoCodingService');
const WeatherService = require('../services/WeatherService');
const { authenticateToken } = require('../middleware/authMiddleware');

module.exports.get_weather = async(req, res) => {
    try {
        const location = req.params.location || 'Tel Aviv';
        const coordinates = await GeoCodingService.getData(location);
        const weather = await WeatherService.getData(coordinates.lat, coordinates.lon);
        res.json({location: coordinates.display_name, data:weather});
      }
      catch (error) {
        const status = error.status || 500; // Default to 500 if error.status is not defined
        res.status(status).json({ error: error.message })
      }
}