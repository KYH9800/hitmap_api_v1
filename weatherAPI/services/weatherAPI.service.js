require('dotenv').config();
const { CustomError } = require('../../utils/Error');
const axios = require('axios');

// open weather: 풍향, 풍속, 기온
const get_weather = async (lat, lon) => {
  const open_weather_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEYS}`;
  const data = await axios
    .get(open_weather_API_URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw new CustomError(error);
    });

  return data;
};

// 바다누리: 만조, 간조, 파고
const get_badanuri_api = async (lat, lon) => {
  console.log('get_badanuri_api 위도: ', lat);
  console.log('get_badanuri_api 경도: ', lon);
};

module.exports = {
  get_weather,
  get_badanuri_api,
};
