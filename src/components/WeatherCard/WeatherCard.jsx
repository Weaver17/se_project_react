import { useContext } from "react";

import "./WeatherCard.css";
import { weatherCondition, defaultCondition } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

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
      <p className="weather-card__temp-text">
        {currentTempUnit === "F" ? weatherData?.temp.F : weatherData?.temp.C}°{" "}
        {currentTempUnit}
      </p>
      <img
        className="weather-card__image"
        src={weatherCard?.image}
        alt={weatherCard?.condition}
      />
    </section>
  );
}

export default WeatherCard;
