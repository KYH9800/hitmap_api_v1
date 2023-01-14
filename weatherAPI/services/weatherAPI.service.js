require('dotenv').config();
const { CustomError } = require('../../utils/Error');
const axios = require('axios');

const { today_func, find_observatory } = require('../observatoryFunc/find_observatory');
// const { observatorArr } = require('../observatory/observatoryObj');

// open weather: 풍향, 풍속, 기온
const get_weather = async (lat, lon) => {
  const open_weather_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${process.env.OPEN_WEATHER_API_KEYS}`;
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
  const obs_post_id = await find_observatory(lat, lon);
  console.log('obs_post_id: ', obs_post_id);
  const today = await today_func();

  const open_api = 'http://www.khoa.go.kr/api/oceangrid/tideObsPreTab/search.do?ServiceKey=';
  const service_key = `${process.env.OPEN_BADANURI_API_KEYS}`;
  const obs_code = `&ObsCode=${obs_post_id}`; // 관측소 번호
  const date = `&Date=${today}`; // 오늘 날짜

  const search_inof = open_api + service_key + obs_code + date + `&ResultType=json`;

  const data = axios
    .get(search_inof)
    .then((res) => {
      console.log('res: ', res.data.result);
      return res.data.result;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
};

module.exports = {
  get_weather,
  get_badanuri_api,
};
