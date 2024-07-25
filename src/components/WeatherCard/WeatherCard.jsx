import "./WeatherCard.css";
import { weatherCondition, defaultCondition } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const weatherOption = weatherCondition.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherCard;
  if (weatherOption.length === 0) {
    weatherCard = defaultCondition[weatherData.isDay ? "day" : "night"];
  } else {
    weatherCard = weatherOption[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp-text">{weatherData.temp.F}° F</p>
      <img
        className="weather-card__image"
        src={weatherCard?.image}
        alt={weatherCard?.condition}
      />
    </section>
  );
}

export default WeatherCard;
