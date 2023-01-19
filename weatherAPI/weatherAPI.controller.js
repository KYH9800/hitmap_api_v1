const { get_weather, get_tide_info } = require('./services/weatherAPI.service');

const get_weather_api = async (req, res) => {
  try {
    const { lat, lon, place_name } = req.query;
    // open weather: 풍향, 풍속, 기온
    const open_weather = await get_weather(lat, lon);
    // 바다누리: 만조, 간조
    const tide = await get_tide_info(lat, lon);

    return res.status(200).send({
      message: '날씨 정보 검색 완료',
      place_name: place_name,
      lon: lon,
      lat: lat,
      weather: open_weather,
      tide_info: tide.map((info) => {
        return {
          '해수면 높이(cm)': info.tph_level,
          tph_time: info.tph_time,
          hl_code: info.hl_code,
        };
      }),
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
