import React from 'react';

function Card({ title, value, icon, desc, type }) {
  return (
    <div className={`glass stat-card stat-${type}`}>
      <div className="stat-info">
        <span className="stat-label">{title}</span>
        <span className="stat-value">{value}</span>
        <span className="stat-desc">{desc}</span>
      </div>
      <div className="stat-icon-wrapper">
        {icon}
      </div>
    </div>
  );
}

export default Card;
