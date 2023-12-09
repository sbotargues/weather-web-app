// src/components/WeatherComponent.tsx
import React, { useState, useRef, useCallback } from "react";
import "./WeatherComponent.css";
import cloud from "../../Assets/cloud.png";
import wind from "../../Assets/wind.png";
import humidityIcon from "../../Assets/humidity.png";
import whiteSearch from "../../Assets/whiteSearch.png";
import { ForecastItem, WeatherData } from "../../Types/Types";
import WeatherBackgrounds from "../../Config/WeatherBackgrounds";
import {
  fetchWeather,
  fetchWeatherByCoords,
  fetchForecast,
} from "../../api/weatherApi";
import useLocation from "../../hooks/useLocation";

function WeatherComponent() {
  const [wicon, setWicon] = useState<string>(cloud);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "https://media.giphy.com/media/1uLQUtPLbJMQ0/giphy.gif"
  );
  const [forecastData, setForecastData] = useState<ForecastItem[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const shouldFetchCurrentLocation = useRef(true);

  const updateWeatherData = useCallback(async (data: WeatherData) => {
    setWeatherData(data);
    const weatherCode = data.weather[0].icon.slice(0, 2);
    const { icon, background } =
      WeatherBackgrounds[weatherCode] || WeatherBackgrounds["02"];
    setWicon(icon);
    setBackgroundImage(background);
    setForecastData(await processForecastData(data.name));
  }, []);

  const processForecastData = async (city: string): Promise<ForecastItem[]> => {
    const data = await fetchForecast(city);

    const dailyForecastMap: Record<string, ForecastItem[]> = {};
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyForecastMap[date]) {
        dailyForecastMap[date] = [];
      }
      const iconCode = item.weather[0].icon.substring(0, 2);
      const icon = WeatherBackgrounds[iconCode]?.icon || cloud;
      dailyForecastMap[date].push({
        date,
        temp: item.main.temp,
        icon: icon,
      });
    });

    return Object.keys(dailyForecastMap)
      .map((date) => {
        const forecasts = dailyForecastMap[date];
        const avgTemp =
          forecasts.reduce((acc, item) => acc + item.temp, 0) /
          forecasts.length;
        return {
          date,
          temp: Math.round(avgTemp),
          icon: forecasts[Math.floor(forecasts.length / 2)].icon,
        };
      })
      .slice(0, 5);
  };

  useLocation(
    useCallback(
      (position) => {
        if (shouldFetchCurrentLocation.current) {
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          )
            .then(updateWeatherData)
            .catch(console.error);
          shouldFetchCurrentLocation.current = false;
        }
      },
      [updateWeatherData]
    ),
    useCallback((error) => {
      console.error("Error getting location: ", error);
    }, []),
    shouldFetchCurrentLocation
  );

  const search = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      fetchWeather(inputRef.current.value)
        .then(updateWeatherData)
        .catch(console.error);
      shouldFetchCurrentLocation.current = false;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            updateWeatherData(data);
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="top-bar">
        <input
          ref={inputRef}
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
        <div className="forecast-container">
          {forecastData.map((day, index) => (
            <div key={index} className="forecast-day">
              <p>{day.date}</p>
              <img src={day.icon} alt="Weather Icon" />
              <p>{day.temp} °C</p>
            </div>
          ))}
        </div>
      </div>
      <div className="button-container">
        <button
          onClick={getCurrentLocation}
          className="current-location-button"
        >
          Get Current Location Weather
        </button>
      </div>
    </div>
  );
}

export default WeatherComponent;
