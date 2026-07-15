import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">🌤️</span>
        <span className="brand-text text-gradient">ClimaPulse</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <span className="nav-icon">📊</span>
          Dashboard
        </NavLink>
        <NavLink 
          to="/maps" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <span className="nav-icon">🌍</span>
          Global Maps
        </NavLink>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          <span className="nav-icon">⚙️</span>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Navbar;
