import axios from "axios";

const getWeather = (latitude, longitude, appid) => axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=id&appid=${appid}`);
const getWeatherPrediction = (latitude, longitude, appid) => axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&units=metric&lang=id&cnt=1&appid=${appid}`);

export {
    getWeather,
    getWeatherPrediction
};
