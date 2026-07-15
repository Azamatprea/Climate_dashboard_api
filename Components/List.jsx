import React from 'react';
import { Link } from 'react-router-dom';

// WMO weather codes mapping helper
export const getWeatherInfo = (code) => {
  if (code === 0) return { label: 'Clear Sky', icon: '☀️', group: 'Clear', className: 'weather-clear' };
  if (code === 1) return { label: 'Mainly Clear', icon: '🌤️', group: 'Clear', className: 'weather-clear' };
  if (code === 2) return { label: 'Partly Cloudy', icon: '⛅', group: 'Cloudy', className: 'weather-cloudy' };
  if (code === 3) return { label: 'Overcast', icon: '☁️', group: 'Cloudy', className: 'weather-cloudy' };
  if (code >= 45 && code <= 48) return { label: 'Foggy', icon: '🌫️', group: 'Cloudy', className: 'weather-cloudy' };
  if (code >= 51 && code <= 57) return { label: 'Drizzle', icon: '🌦️', group: 'Wet', className: 'weather-wet' };
  if (code >= 61 && code <= 67) return { label: 'Rainy', icon: '🌧️', group: 'Wet', className: 'weather-wet' };
  if (code >= 71 && code <= 77) return { label: 'Snowy', icon: '❄️', group: 'Snow', className: 'weather-snow' };
  if (code >= 80 && code <= 82) return { label: 'Rain Showers', icon: '🌧️', group: 'Wet', className: 'weather-wet' };
  if (code >= 85 && code <= 86) return { label: 'Snow Showers', icon: '❄️', group: 'Snow', className: 'weather-snow' };
  if (code >= 95 && code <= 99) return { label: 'Thunderstorm', icon: '🌩️', group: 'Storm', className: 'weather-storm' };
  return { label: 'Unknown', icon: '❓', group: 'Unknown', className: 'weather-cloudy' };
};

// Temp category class helper
export const getTempClass = (temp) => {
  if (temp > 25) return 'temp-hot';
  if (temp > 15) return 'temp-warm';
  if (temp > 5) return 'temp-cool';
  return 'temp-cold';
};

function List({ items }) {
  if (items.length === 0) {
    return (
      <div className="glass empty-state">
        <span className="empty-icon">🌪️</span>
        <h3 className="empty-title">No Cities Found</h3>
        <p className="empty-desc">Try adjusting your search terms or filter settings to display results.</p>
      </div>
    );
  }

  return (
    <div className="table-container glass">
      <table className="weather-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Continent</th>
            <th>Condition</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Wind Info</th>
            <th>Coordinates</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const weather = getWeatherInfo(item.weatherCode);
            const tempClass = getTempClass(item.temperature);
            
            // Format coordinates
            const latStr = `${Math.abs(item.lat).toFixed(2)}° ${item.lat >= 0 ? 'N' : 'S'}`;
            const lonStr = `${Math.abs(item.lon).toFixed(2)}° ${item.lon >= 0 ? 'E' : 'W'}`;

            return (
              <tr key={item.name}>
                {/* City Cell */}
                <td>
                  <div className="city-cell">
                    <span className="city-name">{item.name}</span>
                    <span className="city-country">{item.country}</span>
                  </div>
                </td>
                
                {/* Continent Cell */}
                <td>
                  <span className="continent-badge">{item.continent}</span>
                </td>
                
                {/* Weather Badge Cell */}
                <td>
                  <span className={`weather-badge ${weather.className}`}>
                    <span>{weather.icon}</span>
                    <span>{weather.label}</span>
                  </span>
                </td>
                
                {/* Temperature Cell */}
                <td>
                  <span className={`temp-cell ${tempClass}`}>
                    {item.temperature.toFixed(1)}°C
                  </span>
                </td>
                
                {/* Humidity Cell */}
                <td>
                  <div className="humidity-cell">
                    <div className="humidity-bar-bg">
                      <div 
                        className="humidity-bar-fg" 
                        style={{ width: `${item.humidity}%` }}
                      ></div>
                    </div>
                    <span>{item.humidity}%</span>
                  </div>
                </td>
                
                {/* Wind Cell */}
                <td>
                  <div className="wind-cell">
                    <span 
                      className="wind-arrow" 
                      style={{ 
                        display: 'inline-block',
                        transform: `rotate(${item.windDirection}deg)` 
                      }}
                      title={`${item.windDirection}°`}
                    >
                      ⬆️
                    </span>
                    <span>{item.windSpeed.toFixed(1)} km/h</span>
                  </div>
                </td>
                
                {/* Coordinates Cell */}
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {latStr}, {lonStr}
                </td>
                
                {/* Actions Cell */}
                <td>
                  <Link 
                    to={`/city/${encodeURIComponent(item.name)}`}
                    className="btn-detail"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default List;
