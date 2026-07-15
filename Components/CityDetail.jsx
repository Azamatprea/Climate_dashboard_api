import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWeatherInfo, getTempClass } from './List';

function CityDetail({ weatherData, loading }) {
  const { cityName } = useParams();

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="pulse-loader"></div>
        <p className="loading-text">Synchronizing meteorological data...</p>
      </div>
    );
  }

  // Find the city in the fetched weather data
  const city = weatherData.find(
    (c) => c.name.toLowerCase() === decodeURIComponent(cityName).toLowerCase()
  );

  if (!city) {
    return (
      <div className="glass empty-state" style={{ margin: '2rem auto', maxWidth: '600px' }}>
        <span className="empty-icon" style={{ color: 'var(--accent-rose)' }}>🔍</span>
        <h3 className="empty-title">City Not Found</h3>
        <p className="empty-desc">The meteorological database does not contain records for "{cityName}".</p>
        <Link to="/" className="btn-reset" style={{ display: 'inline-flex', textDecoration: 'none', marginTop: '1rem' }}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const weather = getWeatherInfo(city.weatherCode);
  const tempClass = getTempClass(city.temperature);

  // Format coordinates
  const latStr = `${Math.abs(city.lat).toFixed(4)}° ${city.lat >= 0 ? 'N' : 'S'}`;
  const lonStr = `${Math.abs(city.lon).toFixed(4)}° ${city.lon >= 0 ? 'E' : 'W'}`;

  // Advisory logic
  let climateDesc = "Atmospheric conditions are stable and normal for this region.";
  if (city.temperature > 32) {
    climateDesc = "Severe heat warning. Stay hydrated, seek shade, and avoid outdoor physical exertion during peak hours.";
  } else if (city.temperature < 3) {
    climateDesc = "Sub-zero or freezing temperatures. Wear heavily layered thermal clothing. Watch out for icy surfaces.";
  } else if (city.humidity > 85 && weather.group === 'Wet') {
    climateDesc = "Saturated air mass with ongoing heavy rainfall. Commute with caution and carry waterproof gear.";
  } else if (city.windSpeed > 28) {
    climateDesc = "High velocity wind alert. Loose outdoor objects should be secured. High-profile vehicles should exercise caution.";
  } else if (weather.group === 'Clear') {
    climateDesc = "Clear, high-visibility skies. Excellent weather for solar power generation, aviation, and outdoor activities.";
  } else if (weather.group === 'Storm') {
    climateDesc = "Thunderstorm activity detected. Stay indoors, avoid tall structures, and disconnect sensitive electronic devices.";
  }

  return (
    <div className="detail-page-container">
      {/* Navigation Header */}
      <div className="detail-nav-header">
        <Link to="/" className="btn-back">
          <span className="back-arrow">←</span> Back to Dashboard
        </Link>
        <span className="detail-breadcrumbs">
          Dashboard / {city.continent} / <strong style={{ color: 'var(--text-primary)' }}>{city.name}</strong>
        </span>
      </div>

      <div className="detail-grid">
        {/* Left Column: Hero Weather Panel */}
        <div className="glass detail-hero-card">
          <div className="hero-badge">{city.continent}</div>
          <h1 className="hero-city">{city.name}</h1>
          <p className="hero-country">{city.country}</p>

          <div className="hero-weather-display">
            <span className="hero-weather-icon">{weather.icon}</span>
            <div className="hero-temp-block">
              <span className={`hero-temp ${tempClass}`}>{city.temperature.toFixed(1)}°C</span>
              <span className="hero-condition">{weather.label}</span>
            </div>
          </div>

          <div className="hero-advisory">
            <h4>💡 Meteorological Advisory</h4>
            <p>{climateDesc}</p>
          </div>
        </div>

        {/* Right Column: Key Stats Grid */}
        <div className="detail-stats-wrapper">
          {/* Card 1: Apparent Temp */}
          <div className="glass detail-stat-card glass-interactive">
            <div className="stat-card-header">
              <span className="stat-card-icon">🌡️</span>
              <span className="stat-card-title">Feels Like</span>
            </div>
            <div className="stat-card-value">
              {city.apparentTemperature !== undefined ? `${city.apparentTemperature.toFixed(1)}°C` : 'N/A'}
            </div>
            <p className="stat-card-desc">
              Adjusted for humidity and wind velocity.
            </p>
          </div>

          {/* Card 2: Humidity */}
          <div className="glass detail-stat-card glass-interactive">
            <div className="stat-card-header">
              <span className="stat-card-icon">💧</span>
              <span className="stat-card-title">Relative Humidity</span>
            </div>
            <div className="stat-card-value">{city.humidity}%</div>
            <div className="detail-progress-container" style={{ margin: '0.75rem 0 0.5rem' }}>
              <div className="detail-progress-bar" style={{ width: `${city.humidity}%`, background: 'linear-gradient(90deg, var(--accent-cyan), var(--primary))' }}></div>
            </div>
            <p className="stat-card-desc">
              Concentration of water vapor in the atmosphere.
            </p>
          </div>

          {/* Card 3: Wind Info */}
          <div className="glass detail-stat-card glass-interactive">
            <div className="stat-card-header">
              <span className="stat-card-icon">💨</span>
              <span className="stat-card-title">Wind Speed & Heading</span>
            </div>
            <div className="stat-card-value">{city.windSpeed.toFixed(1)} km/h</div>
            <div className="detail-wind-direction">
              <span 
                className="wind-arrow" 
                style={{ 
                  display: 'inline-block',
                  transform: `rotate(${city.windDirection}deg)`,
                  marginRight: '0.5rem'
                }}
              >
                ⬆️
              </span>
              <span>Heading {city.windDirection}°</span>
            </div>
          </div>

          {/* Card 4: Atmospheric Pressure */}
          <div className="glass detail-stat-card glass-interactive">
            <div className="stat-card-header">
              <span className="stat-card-icon">🌀</span>
              <span className="stat-card-title">Surface Pressure</span>
            </div>
            <div className="stat-card-value">
              {city.surfacePressure !== undefined ? `${city.surfacePressure.toFixed(0)} hPa` : '1013 hPa'}
            </div>
            <p className="stat-card-desc">
              Weight of air columns above this point.
            </p>
          </div>

          {/* Card 5: Cloud Cover */}
          <div className="glass detail-stat-card glass-interactive">
            <div className="stat-card-header">
              <span className="stat-card-icon">☁️</span>
              <span className="stat-card-title">Cloud Cover</span>
            </div>
            <div className="stat-card-value">
              {city.cloudCover !== undefined ? `${city.cloudCover}%` : 'N/A'}
            </div>
            <p className="stat-card-desc">
              Fraction of sky obscured by clouds.
            </p>
          </div>

          {/* Card 6: Geography */}
          <div className="glass detail-stat-card glass-interactive">
            <div className="stat-card-header">
              <span className="stat-card-icon">🏔️</span>
              <span className="stat-card-title">Coordinates & Elevation</span>
            </div>
            <div className="stat-card-value" style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
              {city.elevation ?? '32'} meters
            </div>
            <p className="stat-card-desc" style={{ fontSize: '0.85rem' }}>
              Lat: {latStr} <br /> Lon: {lonStr}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityDetail;
