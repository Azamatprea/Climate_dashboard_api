import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Card from '../Components/Card';
import SearchBar from '../Components/SearchBar';
import FilterControl from '../Components/FilterControl';
import List, { getWeatherInfo } from '../Components/List';
import DashboardCharts from '../Components/DashboardCharts';
import CityDetail from '../Components/CityDetail';
import DataInsights from '../Components/DataInsights';
import './App.css';

// 15 Major Global Cities with unique properties
const CITIES = [
  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, continent: "Asia" },
  { name: "New York", country: "United States", lat: 40.7128, lon: -74.0060, continent: "North America" },
  { name: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278, continent: "Europe" },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, continent: "Europe" },
  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, continent: "Oceania" },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357, continent: "Africa" },
  { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lon: -43.1729, continent: "South America" },
  { name: "Mumbai", country: "India", lat: 19.0760, lon: 72.8777, continent: "Asia" },
  { name: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173, continent: "Europe" },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lon: 18.4241, continent: "Africa" },
  { name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832, continent: "North America" },
  { name: "Reykjavik", country: "Iceland", lat: 64.1466, lon: -21.9426, continent: "Europe" },
  { name: "Dubai", country: "United Arab Emirates", lat: 25.2048, lon: 55.2708, continent: "Asia" },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198, continent: "Asia" },
  { name: "Tashkent", country: "Uzbekistan", lat: 41.2995, lon: 69.2401, continent: "Asia" },
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lon: -58.3816, continent: "South America" }
];

// Placeholder component for secondary views
function PlaceholderView({ title, icon }) {
  return (
    <div className="glass empty-state" style={{ margin: '4rem auto', maxWidth: '600px', padding: '3rem 2rem' }}>
      <span className="empty-icon" style={{ fontSize: '4rem', marginBottom: '1rem', display: 'block' }}>{icon}</span>
      <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1rem' }}>{title}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
        This module is currently running in diagnostic simulation mode. Advanced visualization layers, global geographical maps, and administrative panels are under active development.
      </p>
      <Link to="/" className="btn-reset" style={{ display: 'inline-flex', textDecoration: 'none' }}>
        Back to Dashboard
      </Link>
    </div>
  );
}

// Inner Dashboard View Component
function DashboardView({
  loading,
  error,
  stats,
  searchQuery,
  setSearchQuery,
  selectedContinent,
  setSelectedContinent,
  selectedWeather,
  setSelectedWeather,
  minTemp,
  setMinTemp,
  maxTemp,
  setMaxTemp,
  minWindSpeed,
  setMinWindSpeed,
  handleResetFilters,
  filteredCities,
  weatherData,
  isAnyFilterActive
}) {
  return (
    <>
      {/* Page Header */}
      <Header />

      {loading ? (
        <div className="loading-wrapper">
          <div className="pulse-loader"></div>
          <p className="loading-text">Synchronizing meteorological data...</p>
        </div>
      ) : error ? (
        <div className="glass empty-state">
          <span className="empty-icon" style={{ color: 'var(--accent-rose)' }}>⚠️</span>
          <h3 className="empty-title">Service Interruption</h3>
          <p className="empty-desc">{error}</p>
          <button className="btn-reset" style={{ margin: '1rem auto 0' }} onClick={() => window.location.reload()}>
            Retry Connection
          </button>
        </div>
      ) : (
        <>
          {/* Summary Statistics Section */}
          <section className="stats-grid">
            <Card
              title="Global Mean Temp"
              value={`${stats.avgTemp}°C`}
              icon="🌡️"
              desc="Average across all global cities"
              type="avg"
            />
            <Card
              title="Peak Wind Velocity"
              value={`${stats.maxWind} km/h`}
              icon="💨"
              desc="Maximum recorded wind speed"
              type="max"
            />
            <Card
              title="Clear Sky Ratio"
              value={`${stats.clearRatio}%`}
              icon="☀️"
              desc="Percentage of cities with clear skies"
              type="ratio"
            />
          </section>

          {/* Scientific Insights Banner & Quick Guides */}
          <DataInsights 
            data={filteredCities}
            setSearchQuery={setSearchQuery}
            setSelectedContinent={setSelectedContinent}
            setSelectedWeather={setSelectedWeather}
            setMinTemp={setMinTemp}
            setMaxTemp={setMaxTemp}
            setMinWindSpeed={setMinWindSpeed}
          />

          {/* Graphical Analysis Section with visualization toggling capability */}
          <DashboardCharts data={filteredCities} />

          {/* Filter and Search Controls */}
          <section className="glass controls-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'stretch' }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <FilterControl
              selectedContinent={selectedContinent}
              onContinentChange={setSelectedContinent}
              selectedWeather={selectedWeather}
              onWeatherChange={setSelectedWeather}
              minTemp={minTemp}
              onMinTempChange={setMinTemp}
              maxTemp={maxTemp}
              onMaxTempChange={setMaxTemp}
              minWindSpeed={minWindSpeed}
              onMinWindSpeedChange={setMinWindSpeed}
              onReset={handleResetFilters}
            />
          </section>

          {/* Dynamic Results Count Panel */}
          <div style={{ padding: '0 0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Showing {filteredCities.length} of {weatherData.length} cities</span>
            {isAnyFilterActive ? (
              <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Filters active</span>
            ) : null}
          </div>

          {/* Main Interactive Weather List */}
          <section>
            <List items={filteredCities} />
          </section>
        </>
      )}
    </>
  );
}

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedWeather, setSelectedWeather] = useState("");

  // Stretch Metrics Filter States
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minWindSpeed, setMinWindSpeed] = useState(0);

  // Fetch Weather Data using async/await and useEffect
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Assemble latitude and longitude arrays for multi-coordinate query
        const latitudes = CITIES.map(c => c.lat).join(',');
        const longitudes = CITIES.map(c => c.lon).join(',');
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitudes}&longitude=${longitudes}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,cloud_cover&timezone=auto`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        const data = await response.json();

        // Map fetched data to cities
        const mapped = CITIES.map((city, index) => {
          const apiResponse = Array.isArray(data) ? data[index] : data;
          if (!apiResponse || !apiResponse.current) {
            throw new Error(`Invalid API response format for city at index ${index}`);
          }

          return {
            ...city,
            temperature: apiResponse.current.temperature_2m,
            humidity: apiResponse.current.relative_humidity_2m,
            apparentTemperature: apiResponse.current.apparent_temperature,
            weatherCode: apiResponse.current.weather_code,
            windSpeed: apiResponse.current.wind_speed_10m,
            windDirection: apiResponse.current.wind_direction_10m,
            surfacePressure: apiResponse.current.surface_pressure,
            cloudCover: apiResponse.current.cloud_cover,
            elevation: apiResponse.elevation,
            timezone: apiResponse.timezone
          };
        });

        setWeatherData(mapped);
      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred while retrieving meteorological information.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedContinent("");
    setSelectedWeather("");
    setMinTemp("");
    setMaxTemp("");
    setMinWindSpeed(0);
  };

  // Filter Logic: apply search query, continent filter, weather category, temp bounds, and wind bounds
  const filteredCities = weatherData.filter((city) => {
    // 1. Search Query filter (checks city or country name)
    const matchesSearch =
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Continent filter
    const matchesContinent =
      selectedContinent === "" ||
      city.continent === selectedContinent;

    // 3. Weather Condition category filter
    const weatherInfo = getWeatherInfo(city.weatherCode);
    const matchesWeather =
      selectedWeather === "" ||
      weatherInfo.group === selectedWeather;

    // 4. Specific Temperature Bounds filter
    let matchesMinTemp = true;
    if (minTemp !== "") {
      matchesMinTemp = city.temperature >= parseFloat(minTemp);
    }
    let matchesMaxTemp = true;
    if (maxTemp !== "") {
      matchesMaxTemp = city.temperature <= parseFloat(maxTemp);
    }

    // 5. Slider wind speed filter
    const matchesWind = city.windSpeed >= minWindSpeed;

    return matchesSearch && matchesContinent && matchesWeather && matchesMinTemp && matchesMaxTemp && matchesWind;
  });

  // Calculate Summary Statistics based on full dataset
  const getSummaryStats = () => {
    if (weatherData.length === 0) {
      return { avgTemp: "N/A", maxWind: "N/A", clearRatio: "N/A" };
    }

    // 1. Average Temperature (Mean)
    const totalTemp = weatherData.reduce((sum, c) => sum + c.temperature, 0);
    const avgTemp = (totalTemp / weatherData.length).toFixed(1);

    // 2. Highest Wind Speed (Maximum)
    const maxWind = Math.max(...weatherData.map(c => c.windSpeed)).toFixed(1);

    // 3. Clear/Sunny Cities Ratio (Percentage)
    const clearCount = weatherData.filter(c => getWeatherInfo(c.weatherCode).group === 'Clear').length;
    const clearRatio = Math.round((clearCount / weatherData.length) * 100);

    return { avgTemp, maxWind, clearRatio };
  };

  const stats = getSummaryStats();

  // Checks if any filters are active
  const isAnyFilterActive =
    searchQuery !== "" ||
    selectedContinent !== "" ||
    selectedWeather !== "" ||
    minTemp !== "" ||
    maxTemp !== "" ||
    minWindSpeed > 0;

  return (
    <div className="app-container">
      {/* Sidebar Navigation - Shared across all views */}
      <Navbar />

      {/* Main Content Space */}
      <main className="main-content">
        <Routes>
          {/* Main Dashboard view */}
          <Route
            path="/"
            element={
              <DashboardView
                loading={loading}
                error={error}
                stats={stats}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedContinent={selectedContinent}
                onContinentChange={setSelectedContinent}
                selectedWeather={selectedWeather}
                onWeatherChange={setSelectedWeather}
                minTemp={minTemp}
                onMinTempChange={setMinTemp}
                maxTemp={maxTemp}
                onMaxTempChange={setMaxTemp}
                minWindSpeed={minWindSpeed}
                onMinWindSpeedChange={setMinWindSpeed}
                handleResetFilters={handleResetFilters}
                filteredCities={filteredCities}
                weatherData={weatherData}
                isAnyFilterActive={isAnyFilterActive}
                setSelectedContinent={setSelectedContinent}
                setSelectedWeather={setSelectedWeather}
              />
            }
          />

          {/* Unique Detail Page Route for each city */}
          <Route
            path="/city/:cityName"
            element={<CityDetail weatherData={weatherData} loading={loading} />}
          />

          {/* Navigation link placeholders */}
          <Route path="/maps" element={<PlaceholderView title="Global Meteorological Maps" icon="🌍" />} />
          <Route path="/settings" element={<PlaceholderView title="System Settings" icon="⚙️" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
