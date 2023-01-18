require('dotenv').config();
const { CustomError } = require('../../utils/Error');
const axios = require('axios');

const {
  today_func,
  find_tide_observatory,
  find_wave_height_observatory,
} = require('../observatoryFunc/find_observatory');

// data에서 지금날짜 기준 2일 후의 data까지 찾아오는 함수: open weather api 전용
const find_after2days_from_now_data = (weather_data, today, after2days_from_today) => {
  const now = weather_data.findIndex((data) => data.date >= today);
  const after2days_from_now = weather_data.findIndex((data) => data.date >= after2days_from_today);
  const result = weather_data.slice(now, after2days_from_now + 1);
  // const result = weather_data.slice(now + 3, after2days_from_now + 4);

  return result.map((data) => {
    return {
      post_id: data.post_id,
      temp: data.temp,
      wind_speed: data.wind_speed,
      wind_deg: data.wind_deg,
      date: data.date.split(' ')[1].split(':')[0],
      original_time: data.date,
    };
  });
};

// 날짜 생성 함수: open weather api 전용
const make_date_func = () => {
  const date = new Date();
  const year = date.getFullYear(); // 년
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월
  const day = date.getDate(); // 일
  const hour = date.getHours(); // 시간

  const after2days = `${year}-${month}-${day + 2} 00:00:00`;
  const today = `${year}-${month}-${day} ${hour}:00:00`;
  const after2days_from_today = `${year}-${month}-${day + 2} ${hour}:00:00`;

  return {
    after2days: after2days,
    today: today,
    after2days_from_today: after2days_from_today,
  };
};

// open weather: 풍향, 풍속, 기온
const get_weather = async (lat, lon) => {
  const open_weather_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=kr&appid=${process.env.OPEN_WEATHER_API_KEYS}`;

  const data = await axios
    .get(open_weather_API_URL)
    .then(async (response) => {
      const whether = response.data.list.map((data) => {
        return {
          temp: parseInt(Math.round(data.main.temp) - 273.15),
          wind_speed: data.wind.speed,
          wind_deg: data.wind.deg,
          date: data.dt_txt,
        };
      });

      const result = find_after2days_from_now_data(
        whether,
        make_date_func().today,
        make_date_func().after2days_from_today,
      );

      return result;
    })
    .catch((error) => {
      console.log('error: ', error);
      throw new CustomError(error);
    });

  return data;
};

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
  const today = await today_func();

  const open_api = 'http://www.khoa.go.kr/api/oceangrid/tideObsPreTab/search.do?ServiceKey=';
  const service_key = `${process.env.OPEN_BADANURI_API_KEYS}`;
  const obs_code = `&ObsCode=${obs_post_id}`; // 관측소 번호
  const date = `&Date=${today}`; // 오늘 날짜
  const date_after2days = `&Date=${parseInt(today) + 1}`; // 2일 뒤 날짜
  const date_after3days = `&Date=${parseInt(today) + 2}`; // 3일 뒤 날짜

  const search_info = open_api + service_key + obs_code + date + `&ResultType=json`;
  const search_info_after2days = open_api + service_key + obs_code + date_after2days + `&ResultType=json`;
  const search_info_after3days = open_api + service_key + obs_code + date_after3days + `&ResultType=json`;

  const today_tide = await axios_tide_info(search_info);
  const after2days_tide = await axios_tide_info(search_info_after2days);
  const after3days_tide = await axios_tide_info(search_info_after3days);

  const tide = [...today_tide.data, ...after2days_tide.data, ...after3days_tide.data];

  const index = tide.findIndex((data) => {
    const date = new Date();
    const year = date.getFullYear(); // 년
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월
    const day = date.getDate(); // 일
    const hour = date.getHours(); // 시간
    const minutes = ('0' + date.getMinutes()).slice(-2); // 분
    const seconds = ('0' + date.getSeconds()).slice(-2); // 초

    const now = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

    return now < data.tph_time;
  });

  return tide.slice(index, index + 8);
};

// 바다누리: 파고
//! database에 저장 안하고 바로 불러와 처리하기
//! 크롤링 단방향 요청 시에만 긁어오기
const get_wave_height_info = async (lat, lon) => {
  const obs_post_id = await find_wave_height_observatory(lat, lon);
  const today = await today_func();

  const open_api = 'http://www.khoa.go.kr/api/oceangrid/obsWaveHight/search.do?ServiceKey=';
  const service_key = `${process.env.OPEN_BADANURI_API_KEYS}`;
  const obs_code = `&ObsCode=${obs_post_id}`; // 관측소 번호
  const date = `&Date=${today}`; // 오늘 날짜

  const search_info = open_api + service_key + obs_code + date + `&ResultType=json`;

  const data = axios
    .get(search_info)
    .then((res) => {
      return res.data.result;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
};

module.exports = {
  get_weather,
  get_tide_info,
  get_wave_height_info,
};
