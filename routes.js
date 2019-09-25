var express = require('express');
var bodyParser = require('body-parser');
var methods = require('./methods.js');
var router = express.Router();

//Here we are configuring express to use body-parser as middle-ware.
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
  res.send('Hello World!');
});

router.get('/v1/forecast', async function (req, res) {
  const city = req.query.city;
  const timestamp = req.query.timestamp;
  var result = await methods.getForecastWeather(city, timestamp);
  if (!result) {
    res.status(403).send(result);
  }
  res.send(result);
});

router.get('/current', async function (req, res) {
  const city = req.query.city;
  const timestamp = Date.now();
  var result = await methods.getCurrentWeather(city);
  if (!result) {
    res.status(403).send(result);
  }
  res.send(result);
});

module.exports = router;
