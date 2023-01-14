const { observatoryData } = require('../observatory/observatoryObj');

// 오늘 날짜
const today_func = () => {
  const date = new Date();
  const year = date.getFullYear(); // 년
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월
  const day = date.getDate(); // 일
  const today = `${year}${month}${day}`; // 오늘 날짜

  return today;
};

// 관측소 찾기
const find_observatory = (lat, lon) => {
  // 위도 경도 오차범위로 관측소 정보 찾아주는 함수 하나 만들기
  console.log('관측소 찾기 위도: ', lat);
  console.log('관측소 찾기 경도: ', lon);
  // console.log('observatoryData: ', observatoryData);

  //* - 한 값을 배열 담고 최소값인 데이터를 가진 관측소 정보를 보낸다.

  const obs_post_id = observatoryData.map((data) => {
    // 위도, 경도의 오차범위로 obs_post_id를 찾는다.
    // 오차범위의 조건
    // 오차범위: 데이터 위도 - 받아온 위도 <= 10
    // 오차범위: 데이터 경도 - 받아온 경도 <= 10
    if (
      parseFloat(lat).toFixed(1) - parseFloat(data.obs_lat).toFixed(1) >= 0.2 ||
      parseFloat(data.obs_lat).toFixed(1) - parseFloat(lat).toFixed(1) <= 0.2
    ) {
      console.log('data.obs_lat: ', parseFloat(data.obs_lat).toFixed(1));
      console.log('data.obs_post_id-01: ', data.obs_post_id);
      if (
        parseFloat(lon).toFixed(1) - parseFloat(data.obs_lon).toFixed(1) >= 1 ||
        parseFloat(lon).toFixed(1) - parseFloat(data.obs_lon).toFixed(1) <= 1
      ) {
        console.log('data.obs_lon: ', parseFloat(data.obs_lon).toFixed(1));
        console.log('data.obs_post_id-02: ', data.obs_post_id);
        return data.obs_post_id;
      }
    }
  });

  console.log('obs_post_id: ', obs_post_id);
  // const obs_post_id = 'SO_0553';
  return obs_post_id.filter((data) => data)[0];
};

module.exports = {
  today_func,
  find_observatory,
};
