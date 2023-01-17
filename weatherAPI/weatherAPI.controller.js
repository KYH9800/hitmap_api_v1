const { get_weather, get_tide_info, get_wave_height_info } = require('./services/weatherAPI.service');

const get_weather_api = async (req, res) => {
  try {
    const { lat, lon, place_name } = req.query;
    // open weather: 풍향, 풍속, 기온
    const open_weather = await get_weather(lat, lon); // console.log('open_weather: ', open_weather);
    // 바다누리: 만조, 간조
    const tide = await get_tide_info(lat, lon);
    // 바다누리: 파고
    const wave_height = await get_wave_height_info(lat, lon);

    return res.status(200).send({
      message: '날씨 정보 검색 완료',
      place_name: place_name,
      lon: lon,
      lat: lat,
      weather: open_weather,
      tide_observatory_info: tide.meta,
      tide_info: tide.data,
      wave_observatory_info: wave_height.meta,
      wave_info: wave_height.data,
    });
  } catch (error) {
    console.log(error);
    if (error.message) {
      return res.status(error.statusCode).send({
        errorMessage: error.message,
        status: error.statusCode,
      });
    }
    return res.status(400).send({
      errorMessage: '날씨정보 요청 실패',
    });
  }
};

module.exports = {
  get_weather_api,
};
