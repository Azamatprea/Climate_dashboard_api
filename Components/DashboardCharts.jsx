import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label, valueSuffix = '' }) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="glass" 
        style={{ 
          padding: '0.75rem 1rem', 
          background: 'rgba(11, 12, 22, 0.9)', 
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--panel-hover-border)', 
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <p style={{ margin: '0 0 0.5rem', fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.95rem' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: 0, color: entry.color || entry.fill, fontSize: '0.85rem', fontWeight: '500' }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}{valueSuffix || entry.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function DashboardCharts({ data }) {
  // Visualization toggle state: 'grid' (both), 'temp-bar', 'temp-area', 'energy'
  const [activeVis, setActiveVis] = useState('grid');

  if (!data || data.length === 0) return null;

  // Color helper based on temperature for bars
  const getBarColor = (temp) => {
    if (temp > 28) return 'var(--accent-rose)';   // Hot
    if (temp > 18) return 'var(--accent-amber)';  // Warm
    if (temp > 8) return 'var(--primary)';        // Cool
    return 'var(--accent-cyan)';                  // Cold
  };

  // Render Functions for individual charts
  const renderTemperatureBarChart = () => (
    <div className="glass chart-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '350px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: '600' }}>Global Thermal Profiles (Bar)</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Current air temperature comparison in Celsius across hubs</p>
      </div>
      <div style={{ flex: 1, width: '100%', height: '100%', minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="var(--text-muted)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="var(--text-muted)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip valueSuffix="°C" />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} />
            <Bar 
              dataKey="temperature" 
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.temperature)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderTemperatureAreaChart = () => (
    <div className="glass chart-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '350px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-gradient-amber" style={{ fontSize: '1.2rem', fontWeight: '600' }}>Global Thermal Gradient (Area)</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Continuous temperature transition curve across geographical coordinates</p>
      </div>
      <div style={{ flex: 1, width: '100%', height: '100%', minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="areaTempGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="var(--text-muted)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="var(--text-muted)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip valueSuffix="°C" />} />
            <Area 
              name="Temperature"
              type="monotone" 
              dataKey="temperature" 
              stroke="var(--accent-amber)" 
              fillOpacity={1}
              fill="url(#areaTempGlow)"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 1 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderAtmosphericEnergyChart = () => (
    <div className="glass chart-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '350px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: '600' }}>Atmospheric Energy Dynamics</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Relative humidity (%) vs. wind velocity (km/h) profile</p>
      </div>
      <div style={{ flex: 1, width: '100%', height: '100%', minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="var(--text-muted)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="var(--text-muted)" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36} 
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}
            />
            <Line 
              name="Humidity (%)"
              type="monotone" 
              dataKey="humidity" 
              stroke="var(--accent-cyan)" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              name="Wind Speed (km/h)"
              type="monotone" 
              dataKey="windSpeed" 
              stroke="var(--primary)" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 1 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', margin: '1rem 0' }}>
      
      {/* Interactive Visualizations Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Toggle active data representation
        </div>
        <div className="glass" style={{ display: 'flex', gap: '0.25rem', padding: '0.25rem', borderRadius: '10px' }}>
          <button 
            className={`btn-detail ${activeVis === 'grid' ? 'active-tab' : ''}`} 
            style={{ 
              background: activeVis === 'grid' ? 'var(--primary)' : 'transparent',
              border: 'none',
              color: activeVis === 'grid' ? 'white' : 'var(--text-secondary)',
              borderRadius: '8px',
              padding: '0.4rem 0.75rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.75rem'
            }}
            onClick={() => setActiveVis('grid')}
          >
            📊 Grid
          </button>
          <button 
            className={`btn-detail ${activeVis === 'temp-bar' ? 'active-tab' : ''}`} 
            style={{ 
              background: activeVis === 'temp-bar' ? 'var(--primary)' : 'transparent',
              border: 'none',
              color: activeVis === 'temp-bar' ? 'white' : 'var(--text-secondary)',
              borderRadius: '8px',
              padding: '0.4rem 0.75rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.75rem'
            }}
            onClick={() => setActiveVis('temp-bar')}
          >
            🌡️ Temp (Bar)
          </button>
          <button 
            className={`btn-detail ${activeVis === 'temp-area' ? 'active-tab' : ''}`} 
            style={{ 
              background: activeVis === 'temp-area' ? 'var(--primary)' : 'transparent',
              border: 'none',
              color: activeVis === 'temp-area' ? 'white' : 'var(--text-secondary)',
              borderRadius: '8px',
              padding: '0.4rem 0.75rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.75rem'
            }}
            onClick={() => setActiveVis('temp-area')}
          >
            📈 Temp (Area)
          </button>
          <button 
            className={`btn-detail ${activeVis === 'energy' ? 'active-tab' : ''}`} 
            style={{ 
              background: activeVis === 'energy' ? 'var(--primary)' : 'transparent',
              border: 'none',
              color: activeVis === 'energy' ? 'white' : 'var(--text-secondary)',
              borderRadius: '8px',
              padding: '0.4rem 0.75rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.75rem'
            }}
            onClick={() => setActiveVis('energy')}
          >
            💨 Energy Line
          </button>
        </div>
      </div>

      {/* Dynamic Render according to selected tab */}
      {activeVis === 'grid' && (
        <div className="charts-container-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
          {renderTemperatureBarChart()}
          {renderAtmosphericEnergyChart()}
        </div>
      )}

      {activeVis === 'temp-bar' && (
        <div style={{ height: '420px', width: '100%' }}>
          {renderTemperatureBarChart()}
        </div>
      )}

      {activeVis === 'temp-area' && (
        <div style={{ height: '420px', width: '100%' }}>
          {renderTemperatureAreaChart()}
        </div>
      )}

      {activeVis === 'energy' && (
        <div style={{ height: '420px', width: '100%' }}>
          {renderAtmosphericEnergyChart()}
        </div>
      )}

    </div>
  );
}

export default DashboardCharts;
