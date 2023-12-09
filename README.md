# Weather App

## Description

This Weather App is a React-based web application that provides real-time weather information and forecasts. Users can search for weather updates by city or use their current location.

This is the live APP deployed with Vercel

https://weather-web-app-kappa.vercel.app/

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/).

### Installing Weather App

To install Weather App, follow these steps:

1. Clone the repository:
   git clone https://your-repository-url.git
2. Navigate to the repository directory
   cd weather-web-app
3. Install dependencies
   ### `npm install`

### Using Weather app

To start using Weather App, follow these steps:

1. Run the application:
   ### `npm run start`
   This will start the React application and automatically open it in your default web browser.


### Features and Design

- **State Management**: Utilizes React Hooks (`useState`) for managing weather data, icons, and dynamic backgrounds.
- **Dynamic Weather Data Fetching**: Fetches data from OpenWeatherMap API based on user input or geolocation.
- **Type-Safe Data Handling**: Implements a `WeatherData` interface for structured and predictable data management.
- **Interactive Search Functionality**: Includes a search bar for city-based weather queries, enhancing user interaction.
- **Geolocation Support**: Automatically fetches weather data based on the user's current location on initial load.
- **Responsive and Dynamic Backgrounds**: The background changes dynamically to reflect the current weather condition using GIFs from Giphy.
- **Error Handling**: Robust error handling for API calls and geolocation services.

### Styling

The component is styled using `WeatherComponent.css`, focusing on a clean and user-friendly interface that complements the application's functionality.

### Future Improvements

- **Subcomponent Refactoring**: The code can be further refactored into smaller subcomponents (e.g., `WeatherDetails`, `WeatherBackground`) for better maintainability and readability.
- **Custom Hook for API Calls**: Implementing a custom hook for API calls could streamline data fetching and state management.
- **Enhanced Error Reporting**: Introduce more user-friendly error messages and notifications for a better user experience.
- **Performance Optimization**: Implement lazy loading for GIFs and conditional rendering to enhance performance.
- **Accessibility Improvements**: Increase accessibility by ensuring keyboard navigability and adding ARIA attributes.
