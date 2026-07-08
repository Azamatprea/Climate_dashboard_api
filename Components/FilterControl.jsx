import React from 'react';

function FilterControl({
  selectedContinent,
  onContinentChange,
  selectedWeather,
  onWeatherChange,
  minTemp,
  onMinTempChange,
  maxTemp,
  onMaxTempChange,
  minWindSpeed,
  onMinWindSpeedChange,
  onReset
}) {
  return (
    <div className="filter-controls-container">
      <div className="filter-row">
        {/* Continent Filter */}
        <div className="filter-item">
          <label className="filter-label">Continent</label>
          <select
            className="filter-select"
            value={selectedContinent}
            onChange={(e) => onContinentChange(e.target.value)}
          >
            <option value="">All Continents</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {/* Weather Category Filter */}
        <div className="filter-item">
          <label className="filter-label">Condition</label>
          <select
            className="filter-select"
            value={selectedWeather}
            onChange={(e) => onWeatherChange(e.target.value)}
          >
            <option value="">All Conditions</option>
            <option value="Clear">Clear / Sunny</option>
            <option value="Cloudy">Cloudy / Overcast</option>
            <option value="Wet">Rain / Drizzle</option>
            <option value="Snow">Snow / Freezing</option>
            <option value="Storm">Thunderstorm</option>
          </select>
        </div>

        {/* Wind Speed Slider */}
        <div className="filter-item slider-item">
          <label className="filter-label">
            Min Wind Speed: <span className="val-highlight">{minWindSpeed} km/h</span>
          </label>
          <input
            type="range"
            className="filter-slider"
            min="0"
            max="30"
            step="1"
            value={minWindSpeed}
            onChange={(e) => onMinWindSpeedChange(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="filter-row second-row">
        {/* Specific Temp Bounds */}
        <div className="filter-item bounds-item">
          <label className="filter-label">Temperature Bounds (°C)</label>
          <div className="bounds-inputs">
            <input
              type="number"
              className="bounds-input"
              placeholder="Min Temp (e.g. -10)"
              value={minTemp}
              onChange={(e) => onMinTempChange(e.target.value)}
              title="Minimum Temperature Bound"
            />
            <span className="bounds-separator">to</span>
            <input
              type="number"
              className="bounds-input"
              placeholder="Max Temp (e.g. 40)"
              value={maxTemp}
              onChange={(e) => onMaxTempChange(e.target.value)}
              title="Maximum Temperature Bound"
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className="filter-item reset-item">
          <button className="btn-reset" onClick={onReset}>
            <span>🧹</span> Reset Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterControl;
