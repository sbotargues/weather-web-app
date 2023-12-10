import React from "react";
import { fetchWeatherByCoords } from "../../api/weatherApi";
import { CurrentLocationButtonProps } from "../../Types/Types";

const CurrentLocationButton: React.FC<CurrentLocationButtonProps> = ({
  updateWeatherData,
}) => {
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
    <div className="button-container">
      <button onClick={getCurrentLocation} className="current-location-button">
        Get Current Location Weather
      </button>
    </div>
  );
};

export default CurrentLocationButton;
