import React from "react";
import { ForecastContainerProps, ForecastItem } from "../../Types/Types";

const ForecastContainer: React.FC<ForecastContainerProps> = ({
  forecastData,
}) => (
  <div className="forecast-container">
    {forecastData.map((day, index) => (
      <div key={index} className="forecast-day">
        <p>{day.date}</p>
        <img src={day.icon} alt="Weather Icon" />
        <p>{day.temp} °C</p>
      </div>
    ))}
  </div>
);

export default ForecastContainer;
