import React, { useState, useEffect } from "react";
import "./WeatherComponent.css";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import rain from "../Assets/rain.png";
import wind from "../Assets/wind.png";
import snow from "../Assets/snow.png";
import humidityIcon from "../Assets/humidity.png";
import whiteSearch from "../Assets/whiteSearch.png";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{ icon: string }>;
  wind: {
    speed: number;
  };
  name: string;
}

function WeatherComponent() {
  let api_key = "5638de59de20dae880f2595b6dd99aa1";

  const [wicon, setWicon] = useState<string>(cloud);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const rainGif = "https://media.giphy.com/media/l0Iy5fjHyedk9aDGU/giphy.gif";
  const cloudGif = "https://media.giphy.com/media/1uLQUtPLbJMQ0/giphy.gif";
  const drizzleGif =
    "https://media.giphy.com/media/xT9GEOg09OuResnZ6g/giphy.gif";
  const clearGif =
    "https://media.giphy.com/media/7NRoRUOwM22OBAQS7L/giphy-downsized-large.gif";
  const snowGif = "https://media.giphy.com/media/OWxrxRHY6afRu/giphy.gif";

  const [backgroundImage, setBackgroundImage] = useState<string>(cloudGif);

  const fetchWeather = async (city: string) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
      let response = await fetch(url);
      let data = await response.json();
      updateWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=Metric&appid=${api_key}`;
      let response = await fetch(url);
      let data = await response.json();
      updateWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  interface WeatherBackground {
    icon: string;
    background: string;
  }

  interface WeatherBackgroundMap {
    [key: string]: WeatherBackground;
  }

  const weatherBackgrounds: WeatherBackgroundMap = {
    "01": { icon: clear, background: clearGif },
    "02": { icon: cloud, background: cloudGif },
    "03": { icon: drizzle, background: drizzleGif },
    "04": { icon: drizzle, background: drizzleGif },
    "09": { icon: rain, background: rainGif },
    "10": { icon: rain, background: rainGif },
    "13": { icon: snow, background: snowGif },
  };

  const updateWeatherData = (data: WeatherData) => {
    setWeatherData(data);
    const weatherCode = data.weather[0].icon.slice(0, 2);
    const { icon, background } =
      weatherBackgrounds[weatherCode] || weatherBackgrounds["02"];
    setWicon(icon);
    setBackgroundImage(background);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const search = () => {
    const element = document.getElementsByClassName(
      "city-input"
    )[0] as HTMLInputElement;

    if (element && element.value !== "") {
      fetchWeather(element.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="top-bar">
        <input
          type="text"
          className="city-input"
          placeholder="Introduce a city name"
          onKeyDown={handleKeyDown}
        ></input>
        <div className="search-icon" onClick={search}>
          <img src={whiteSearch} alt="searchIcon" />
        </div>
      </div>
      <div className="content">
        <div>
          <img src={wicon} alt="weatherIcon" className="weather-icon" />
          <div className="weather-temp">
            {weatherData
              ? `${Math.round(weatherData.main.temp)} °C`
              : "Loading..."}
          </div>
          <div className="weather-location">
            {weatherData ? weatherData.name : "Loading..."}
          </div>
        </div>
        <div className="data-container">
          <div className="element">
            <img src={humidityIcon} alt="Humidity Icon" className="icon" />
            <div className="data">
              <div className="humidity-percent">
                {weatherData ? `${weatherData.main.humidity}%` : "Loading..."}
              </div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind} alt="Wind Icon" className="icon" />
            <div className="data">
              <div className="wind-rate">
                {weatherData ? `${weatherData.wind.speed} Km/h` : "Loading..."}
              </div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button onClick={getLocation} className="current-location-button">
          Get Current Location Weather
        </button>
      </div>
    </div>
  );
}

export default WeatherComponent;
