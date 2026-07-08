import React from 'react';

function Navbar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">🌤️</span>
        <span className="brand-text text-gradient">ClimaPulse</span>
      </div>
      <nav className="sidebar-nav">
        <button className="nav-item active">
          <span className="nav-icon">📊</span>
          Dashboard
        </button>
        <button className="nav-item">
          <span className="nav-icon">🌍</span>
          Global Maps
        </button>
        <button className="nav-item">
          <span className="nav-icon">⚙️</span>
          Settings
        </button>
      </nav>
    </aside>
  );
}

export default Navbar;
