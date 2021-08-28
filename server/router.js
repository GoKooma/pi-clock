const router = require('express').Router();
const controller = require('./controller')

router.route('weather')
  .get(controller.fetchWeather)

module.exports = router;