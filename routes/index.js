const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { authenticateToken } = require('../middleware/authMiddleware');

// router.use(authenticateToken);
/* GET home page. */
router.get('/:location',authenticateToken,  weatherController.get_weather); 

module.exports = router;
