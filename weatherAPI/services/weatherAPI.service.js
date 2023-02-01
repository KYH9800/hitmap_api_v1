require('dotenv').config();
const { CustomError } = require('../../utils/Error');
const axios = require('axios');

const { today_func, all_time_info_in_today, find_tide_observatory } = require('../observatoryFunc/find_observatory');

// open weather api 요청 함수
const axios_weather_info = async (open_weather_API_URL) => {
  const data = await axios
    .get(open_weather_API_URL)
    .then(async (response) => {
      console.log('response.data.list: ', response.data.list);
      const whether = response.data.list.map((data) => {
        return {
          temp: parseInt(Math.round(data.main.temp) - 273.15),
          wind_speed: data.wind.speed,
          wind_deg: data.wind.deg,
          rain: data.rain ? data.rain['3h'] : 0,
          date: data.dt_txt,
        };
      });

      return whether;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw new CustomError(error);
    });

  return data;
};

// open weather: 풍향, 풍속, 기온
const get_weather = async (lat, lon) => {
  const open_weather_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=kr&appid=${process.env.OPEN_WEATHER_API_KEYS}`;

  const whether = await axios_weather_info(open_weather_API_URL);

  const index = whether.findIndex((data) => {
    const yy_mm_dd_hh_mm_ss = all_time_info_in_today().YY_MM_DD_HH_MM_SS; // 지금 시간
    let now_hour = ('0' + yy_mm_dd_hh_mm_ss.split(' ')[1].split(':')[0]).slice(-2); // Hour in 지금 시간

    const today = today_func()._today;

    const data_yy_mm_dd = data.date.split(' ')[0]; // 데이터의 년-월-일
    let data_time = data.date.split(' ')[1].split(':')[0]; // Hour in 데이터 시간에

    if (data_time === '00') {
      data_time = '24';
    }

    if (now_hour === '00') {
      now_hour = '24';
    }

    return today === data_yy_mm_dd && (now_hour < data_time || now_hour === data_time);
  });

  const result = whether.slice(index, index + 17);

  return result.map((data) => {
    return {
      post_id: data.post_id,
      temp: data.temp,
      wind_speed: data.wind_speed,
      wind_deg: data.wind_deg,
      rain: data.rain,
      time: data.date.split(' ')[1].split(':')[0],
      original_time: data.date,
    };
  });
};

// 조석예보 api 요청 함수
const axios_tide_info = async (url) => {
  const map_data = await axios
    .get(url)
    .then((res) => {
      return res.data.result;
    })
    .catch((error) => {
      console.log(error);
    });

  return map_data;
};

// 바다누리: 조석 예보
const get_tide_info = async (lat, lon) => {
  const obs_post_id = await find_tide_observatory(lat, lon);
  const today = await today_func().today;
  const after2days = await today_func().after2days;
  const after3days = await today_func().after3days;

  const open_api = 'http://www.khoa.go.kr/api/oceangrid/tideObsPreTab/search.do?ServiceKey=';
  const service_key = `${process.env.OPEN_BADANURI_API_KEYS}`;
  const obs_code = `&ObsCode=${obs_post_id}`; // 관측소 번호
  const date = `&Date=${today}`; // 오늘 날짜
  const date_after2days = `&Date=${parseInt(after2days)}`; // 2일 뒤 날짜
  const date_after3days = `&Date=${parseInt(after3days)}`; // 3일 뒤 날짜

  const search_info = open_api + service_key + obs_code + date + `&ResultType=json`;
  const search_info_after2days = open_api + service_key + obs_code + date_after2days + `&ResultType=json`;
  const search_info_after3days = open_api + service_key + obs_code + date_after3days + `&ResultType=json`;

  const today_tide = await axios_tide_info(search_info);
  const after2days_tide = await axios_tide_info(search_info_after2days);
  const after3days_tide = await axios_tide_info(search_info_after3days);

  const tide = [...today_tide.data, ...after2days_tide.data, ...after3days_tide.data];

  const index = tide.findIndex((data) => {
    const yy_mm_dd_hh_mm_ss = all_time_info_in_today().YY_MM_DD_HH_MM_SS; // 지금 시간
    let now_hour = ('0' + yy_mm_dd_hh_mm_ss.split(' ')[1].split(':')[0]).slice(-2); // Hour in 지금 시간

    const today = today_func()._today;

    const data_yy_mm_dd = data.tph_time.split(' ')[0]; // 데이터의 년-월-일
    let data_time = data.tph_time.split(' ')[1].split(':')[0]; // Hour in 데이터 시간에

    if (data_time === '00') {
      data_time = '24';
    }

    if (now_hour === '00') {
      now_hour = '24';
    }
    // return today === data_yy_mm_dd && (now_hour < data_time || now_hour === data_time);
    return (
      !(
        today === data_yy_mm_dd &&
        (now_hour - data_time === 0 || now_hour - data_time === 1 || now_hour - data_time === 2)
      ) || today === data_yy_mm_dd
    );
  });

  return tide.slice(index, index + 8);
};

module.exports = {
  get_weather,
  get_tide_info,
};
