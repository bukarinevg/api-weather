const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { authenticateToken } = require('../middleware/authMiddleware');

// router.use(authenticateToken);
/* GET home page. */
router.get('/protected/:location?',authenticateToken,  weatherController.get_weather); 
router.get('/public/:location?',  weatherController.get_weather); 
module.exports = router;
