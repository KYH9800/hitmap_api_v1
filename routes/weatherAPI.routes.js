const express = require('express');
const router = express.Router();

const { get_weather_api } = require('../weatherAPI/weatherAPI.controller');

router.get('/', get_weather_api); // 날씨정보 API

module.exports = router;
