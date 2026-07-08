import React from 'react';
import { getWeatherInfo, getTempClass } from './List';

function DetailModal({ city, onClose }) {
  if (!city) return null;

  const weather = getWeatherInfo(city.weatherCode);
  const tempClass = getTempClass(city.temperature);

  // Format coordinates
  const latStr = `${Math.abs(city.lat).toFixed(4)}° ${city.lat >= 0 ? 'N' : 'S'}`;
  const lonStr = `${Math.abs(city.lon).toFixed(4)}° ${city.lon >= 0 ? 'E' : 'W'}`;

  // Describe weather conditions based on humidity and temp
  let climateDesc = "Normal conditions.";
  if (city.temperature > 30) {
    climateDesc = "Hot and dry atmosphere. Stay hydrated!";
  } else if (city.temperature < 5) {
    climateDesc = "Freezing temperatures. Warm clothing recommended.";
  } else if (city.humidity > 80) {
    climateDesc = "High atmospheric moisture. Expect damp conditions.";
  } else if (city.windSpeed > 25) {
    climateDesc = "Gale-force winds detected. Secure loose outdoor objects.";
  } else if (weather.group === 'Clear') {
    climateDesc = "Perfect day for outdoor activities. Enjoy the sunshine!";
  } else if (weather.group === 'Wet') {
    climateDesc = "Rain showers ongoing. Carry an umbrella.";
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <span className="modal-continent">{city.continent}</span>
          <h2>{city.name}</h2>
          <p className="modal-country">{city.country}</p>
        </div>

        <div className="modal-body">
          <div className="modal-weather-hero">
            <span className="modal-weather-icon">{weather.icon}</span>
            <div className="modal-temp-display">
              <span className={`modal-temp-val ${tempClass}`}>{city.temperature.toFixed(1)}°C</span>
              <span className="modal-weather-label">{weather.label}</span>
            </div>
          </div>

          <p className="modal-desc">
            <strong>Advisory: </strong> {climateDesc}
          </p>

          <div className="modal-stats-grid">
            <div className="modal-stat-box">
              <span className="modal-box-label">Humidity</span>
              <span className="modal-box-value">{city.humidity}%</span>
              <div className="modal-progress-container">
                <div className="modal-progress-bar" style={{ width: `${city.humidity}%` }}></div>
              </div>
            </div>

            <div className="modal-stat-box">
              <span className="modal-box-label">Wind Velocity</span>
              <span className="modal-box-value">{city.windSpeed.toFixed(1)} km/h</span>
              <span className="modal-box-sub">Direction: {city.windDirection}°</span>
            </div>

            <div className="modal-stat-box">
              <span className="modal-box-label">Geographic Location</span>
              <span className="modal-box-value" style={{ fontSize: '0.95rem' }}>{latStr}</span>
              <span className="modal-box-sub">{lonStr}</span>
            </div>

            <div className="modal-stat-box">
              <span className="modal-box-label">Elevation</span>
              <span className="modal-box-value">{city.elevation ?? '32'}m</span>
              <span className="modal-box-sub">Above Sea Level</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
