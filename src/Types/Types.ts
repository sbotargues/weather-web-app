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
