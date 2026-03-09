import React, { useState } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = (e) => {
    e.preventDefault();
    // mock data
    setWeather({ temp: Math.floor(Math.random() * 35), desc: 'Sunny' });
  };

  return (
    <div className="weather-container">
      <h2>Weather</h2>
      <form onSubmit={fetchWeather}>
        <input value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city" />
      </form>
      {weather && (
        <div className="weather-info">
          <h3>{weather.temp}°C</h3>
          <p>{weather.desc}</p>
        </div>
      )}
    </div>
  );
};
export default WeatherWidget;
