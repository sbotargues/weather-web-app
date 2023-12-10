export interface WeatherData {
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

export interface WeatherBackground {
  icon: string;
  background: string;
}

export interface WeatherBackgroundMap {
  [key: string]: WeatherBackground;
}

export interface ForecastItem {
  date: string;
  temp: number;
  icon: string;
}


export interface ForecastContainerProps {
  forecastData: ForecastItem[];
}

export interface DataContainerProps {
  weatherData: WeatherData | null;
}

export interface CurrentLocationButtonProps {
  updateWeatherData: (data: WeatherData) => Promise<void>;
}
