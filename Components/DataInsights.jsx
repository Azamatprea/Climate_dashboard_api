import React from 'react';

function DataInsights({ 
  data, 
  setSearchQuery, 
  setSelectedContinent, 
  setSelectedWeather, 
  setMinTemp, 
  setMaxTemp, 
  setMinWindSpeed 
}) {
  if (!data || data.length === 0) return null;

  // Dynamically calculate extreme data points for annotations
  const getExtremes = () => {
    let hottest = data[0];
    let windiest = data[0];
    let mostHumid = data[0];

    data.forEach(city => {
      if (city.temperature > hottest.temperature) hottest = city;
      if (city.windSpeed > windiest.windSpeed) windiest = city;
      if (city.humidity > mostHumid.humidity) mostHumid = city;
    });

    return { hottest, windiest, mostHumid };
  };

  const extremes = getExtremes();

  // Guided tours presets
  const applyPreset = (preset) => {
    // Reset first
    setSearchQuery("");
    setSelectedContinent("");
    setSelectedWeather("");
    setMinTemp("");
    setMaxTemp("");
    setMinWindSpeed(0);

    // Apply specific parameters
    if (preset === 'desert') {
      setSelectedContinent("Asia");
      setMinTemp("25");
      setSelectedWeather("Clear");
    } else if (preset === 'arctic') {
      setSelectedContinent("Europe");
      setMaxTemp("15");
    } else if (preset === 'tropical') {
      setSelectedContinent("Asia");
      setMinWindSpeed(0);
      // We can also let users explore high humidity
      setMinTemp("20");
    } else if (preset === 'gale') {
      setMinWindSpeed(15);
    }
  };

  return (
    <div className="glass insights-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.75rem' }}>
        <h3 className="text-gradient-cyan" style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📊</span> Climate Intelligence Insights
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
          Discover interesting trends and correlations in the global climate dataset.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {/* Dynamic Annotations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>📍 Active Dataset Annotations</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <li style={{ color: 'var(--text-secondary)' }}>
              🔥 <strong style={{ color: 'var(--accent-rose)' }}>Hottest Active Hub:</strong> {extremes.hottest.name} ({extremes.hottest.temperature.toFixed(1)}°C)
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Located in {extremes.hottest.country}. High thermal energy.</span>
            </li>
            <li style={{ color: 'var(--text-secondary)' }}>
              💨 <strong style={{ color: 'var(--primary)' }}>Windiest Active Hub:</strong> {extremes.windiest.name} ({extremes.windiest.windSpeed.toFixed(1)} km/h)
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Wind direction is heading {extremes.windiest.windDirection}°.</span>
            </li>
            <li style={{ color: 'var(--text-secondary)' }}>
              💧 <strong style={{ color: 'var(--accent-cyan)' }}>Saturated Atmosphere:</strong> {extremes.mostHumid.name} ({extremes.mostHumid.humidity}%)
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Highest relative moisture concentration.</span>
            </li>
          </ul>
        </div>

        {/* Guided Exploration Tours */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>🌍 Guided Exploration Tours</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
            Click a preset below to instantly configure filter parameters and highlight specific global weather relationships.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
            <button 
              className="btn-detail" 
              style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', display: 'inline-flex', gap: '0.25rem', alignItems: 'center' }}
              onClick={() => applyPreset('desert')}
            >
              ☀️ Desert Heat Focus
            </button>
            <button 
              className="btn-detail" 
              style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', display: 'inline-flex', gap: '0.25rem', alignItems: 'center' }}
              onClick={() => applyPreset('arctic')}
            >
              ❄️ Nordic Chill
            </button>
            <button 
              className="btn-detail" 
              style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', display: 'inline-flex', gap: '0.25rem', alignItems: 'center' }}
              onClick={() => applyPreset('gale')}
            >
              💨 Gale-Force Winds
            </button>
          </div>
        </div>

        {/* Scientific Interest Note */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '600' }}>🔬 Meteorological Focus</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.5', margin: 0 }}>
            <strong>The Humidity-Temperature Trade-off:</strong> Notice how cities with extreme temperatures (like Dubai or Cairo) exhibit very low relative humidity. Conversely, islands or maritime regions (like Reykjavik or Sydney) experience lower thermal volatility and steady moisture saturation. Use the filters to test these correlations in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DataInsights;
