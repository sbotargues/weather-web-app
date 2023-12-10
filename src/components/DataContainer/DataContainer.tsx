import React from "react";
import { DataContainerProps, WeatherData } from "../../Types/Types";
import humidityIcon from "../../Assets/humidity.png";
import wind from "../../Assets/wind.png";

const DataContainer: React.FC<DataContainerProps> = ({ weatherData }) => (
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
);

export default DataContainer;
