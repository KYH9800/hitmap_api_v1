const { tide_observatory_info } = require('./tide_observatory_data'); // 조석
const { wave_height_observatort_info } = require('./wave_height_observatort_data'); // 파고

// 오늘 날짜
const today_func = () => {
  const date = new Date();
  const year = date.getFullYear(); // 년
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월
  const day = date.getDate(); // 일
  const today = `${year}${month}${day}`; // 오늘 날짜

  return today;
};

// 위도 경도 오차범위로 관측소 정보 찾아주는 함수 하나 만들기
const find_observatory = (lat, lon, data) => {
  let result = [];

  data.forEach((data) => {
    let data_lat = parseFloat(data.obs_lat);
    let data_lon = parseFloat(data.obs_lon);

    // 좌표를 라디안 단위로 변환
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    // 지구 반지름(km)
    let earth_radius = 6371;
    // 좌표를 라디안 단위로 표시
    let deg2rad_Lat = deg2rad(data_lat - lat);
    let deg2rad_Lon = deg2rad(data_lon - lon);
    // 두 점 사이의 현 길이 절반의 제곱
    let spot_length =
      Math.sin(deg2rad_Lat / 2) * Math.sin(deg2rad_Lat / 2) +
      Math.cos(deg2rad(lat)) * Math.cos(deg2rad(data_lat)) * Math.sin(deg2rad_Lon / 2) * Math.sin(deg2rad_Lon / 2);
    // 각거리를 라디안으로 표시, 라디안: 각의 크기를 재는 SI 유도 단위
    let radian = 2 * Math.atan2(Math.sqrt(spot_length), Math.sqrt(1 - spot_length));
    // km 단위의 거리
    let km = earth_radius * radian;

    result.push(km);
  });
  // const min_km = Math.min.apply(null, result); // 최소 거리 정보
  // console.log('result: ', result);
  // console.log('min_km: ', min_km);
  const find_index = result.indexOf(Math.min.apply(null, result));

  return data[find_index].obs_post_id;
};

// 조석예보 관측소 찾기
const find_tide_observatory = (lat, lon) => {
  const tide_observatory = find_observatory(lat, lon, tide_observatory_info);

  return tide_observatory;
};

// 파고 관측소 찾기
const find_wave_height_observatory = (lat, lon) => {
  const tide_observatory = find_observatory(lat, lon, wave_height_observatort_info);

  return tide_observatory;
};

module.exports = {
  today_func,
  find_tide_observatory,
  find_wave_height_observatory,
};