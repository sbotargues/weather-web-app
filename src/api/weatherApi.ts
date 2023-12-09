// src/api/weatherApi.ts
const API_KEY = "5638de59de20dae880f2595b6dd99aa1";

const fetchWeather = async (city: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API_KEY}`;
  const response = await fetch(url);
  return response.json();
};

const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=Metric&appid=${API_KEY}`;
  const response = await fetch(url);
  return response.json();
};

const fetchForecast = async (city: string) => {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=Metric`;
  const response = await fetch(forecastUrl);
  return response.json();
};

export { fetchWeather, fetchWeatherByCoords, fetchForecast };
