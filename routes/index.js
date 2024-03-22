var express = require('express');

var GeographCoordinatesService = require('../services/GeographCoordinatesService');
var geoip = require('geoip-lite');
var router = express.Router();

/* GET home page. */
router.get('/:location', async function(req, res, next) {
  try {
    const location = req.params.location || 'Default Location';
    const coordinates = await GeographCoordinatesService.getCoordinates(location);
    // if (!coordinates || !coordinates.lat || !coordinates.lon) {
    //   throw { status: 404, message: 'No data returned from the API' };
    // }
    res.json({data:coordinates});
  }
  catch (error) {
    const status = error.status || 500; // Default to 500 if error.status is not defined
    res.status(status).json({ error: error.message })
  }
}); 

module.exports = router;
