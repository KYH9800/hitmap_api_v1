const { get_weather, get_badanuri_api } = require('./services/weatherAPI.service');

const get_weather_api = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    // open weather: 풍향, 풍속, 기온
    const open_weather = await get_weather(lat, lon);

    // 바다누리: 만조, 간조, 파고
    const badanuri = await get_badanuri_api(lat, lon);
    console.log('badanuri: ', badanuri);

    return res.status(200).send({
      message: '날씨 정보 검색 완료',
      data: open_weather,
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
