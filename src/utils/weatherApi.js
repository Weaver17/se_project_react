import { handleServerResponse } from "./itemApi";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
    `
  ).then(handleServerResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F, result.temp.C);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (fahrenheit, celcius) => {
  if (fahrenheit > 60 || celcius > 15) {
    return "hot";
  } else if (fahrenheit <= 60 || celcius <= 15) {
    return "warm";
  } else if (fahrenheit <= 50 || celcius <= 10) {
    return "cold";
  }
};
