var express = require('express');

var GeographCoordinatesService = require('../services/GeographCoordinatesService');
var WeatherService = require('../services/WeatherService');
var geoip = require('geoip-lite');
var router = express.Router();

/* GET home page. */
router.get('/:location', async function(req, res, next) {
  try {
    const location = req.params.location || 'London';
    const coordinates = await GeographCoordinatesService.getCoordinates(location);
    const weather = await WeatherService.getWeather(coordinates.lat, coordinates.lon);
    res.json({data:weather});
  }
  catch (error) {
    const status = error.status || 500; // Default to 500 if error.status is not defined
    res.status(status).json({ error: error.message })
  }
}); 

module.exports = router;
