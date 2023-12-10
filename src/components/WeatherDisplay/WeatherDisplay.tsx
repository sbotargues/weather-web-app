import React from "react";
import { WeatherData } from "../../Types/Types";
import cloud from "../../Assets/cloud.png";

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  wicon: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, wicon }) => (
  <div>
    <img src={wicon || cloud} alt="weatherIcon" className="weather-icon" />
    <div className="weather-temp">
      {weatherData ? `${Math.round(weatherData.main.temp)} °C` : "Loading..."}
    </div>
    <div className="weather-location">
      {weatherData ? weatherData.name : "Loading..."}
    </div>
  </div>
);

export default WeatherDisplay;
