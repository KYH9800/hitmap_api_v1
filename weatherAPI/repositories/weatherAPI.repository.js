class WeatherRepository {
  constructor(WeatherModel) {
    this.weatherModel = WeatherModel;
  }

  getWeatherData = async (today) => {
    if (today) {
      const result = await this.weatherModel.findAll({
        where: {
          date: today,
        },
        order: [['date', 'ASC']], // DESC
      });
      return result;
    } else {
      const result = await this.weatherModel.findAll({
        where: {},
        order: [['date', 'ASC']], // DESC
      });
      return result;
    }
  };

  createWeatherData = async (data) => {
    const result = await this.weatherModel.create({
      temp: parseInt(Math.round(data.main.temp) - 273.15),
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      date: data.dt_txt,
    });

    return result;
  };

  deleteWeatherData = async () => {
    await this.weatherModel.destroy({
      where: {},
      truncate: true,
    });
  };
}

module.exports = WeatherRepository;
