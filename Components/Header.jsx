import React, { useState, useEffect } from 'react';

function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit' });
  };

  return (
    <header className="header-wrapper">
      <div className="header-title">
        <h1 className="text-gradient">Weather Intelligence</h1>
        <p>Real-time analytics and conditions for global metropolitan hubs</p>
      </div>
      <div className="header-time glass">
        <span>{formatTime(time)}</span>
        <p>{formatDate(time)}</p>
      </div>
    </header>
  );
}

export default Header;
