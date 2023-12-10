// src/components/WeatherComponent.tsx
import React, { useState, useRef, useCallback } from "react";
import "./WeatherComponent.css";
import cloud from "../Assets/cloud.png";
import { ForecastItem, WeatherData } from "../Types/Types";
import WeatherBackgrounds from "../Config/WeatherBackgrounds";
import {
  fetchWeather,
  fetchWeatherByCoords,
  fetchForecast,
} from "../api/weatherApi";
import useLocation from "../hooks/useLocation";
import CurrentLocationButton from "./CurrentLocationButton/CurrentLocationButton";
import WeatherDisplay from "./WeatherDisplay/WeatherDisplay";
import SearchBar from "./SearchBar/SearchBar";
import DataContainer from "./DataContainer/DataContainer";
import ForecastContainer from "./ForecastContainer/ForecastContainer";

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

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <SearchBar
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        onSearchClick={search}
      />
      <div className="content">
        <WeatherDisplay weatherData={weatherData} wicon={wicon} />
        <DataContainer weatherData={weatherData} />
        <ForecastContainer forecastData={forecastData} />
      </div>
      <CurrentLocationButton updateWeatherData={updateWeatherData} />
    </div>
  );
}

export default WeatherComponent;
