var express = require('express');
const { response } = require('../app');
var geoip = require('geoip-lite');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const ip = req.ip;
  const geo = geoip.lookup(ip);
  console.log(geo);
  console.log('here');
  res.render('index', { title: 'Express ' , ip: ip, geo: geo});
});

module.exports = router;
