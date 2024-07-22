export const getWeather = ({ latitude, longitude }, APIkey) => {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
    `)
    .then(handleServerResponse)
}

const handleServerResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export const filterWeatherData = (data) => {
    const result = {};
    result.city = data.name;
    result.temp = { F: data.main.temp, C: 999 };
    result.type = getWeatherType(result.temp.F);
    return result
};

const getWeatherType = (temperature) => {
    if (temperature >= 77) {
        return 'hot';
      } else if (temperature >= 60) {
        return 'warm';
      } else {
        return 'cold';
      }
}
