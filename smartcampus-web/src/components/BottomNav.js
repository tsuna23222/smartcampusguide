import React from 'react';

const tabs = [
  { key: 'dashboard', icon: '🏠', label: 'Home' },
  { key: 'schedule', icon: '📅', label: 'Schedule' },
  { key: 'map', icon: '🗺️', label: 'Map' },
  { key: 'notifications', icon: '🔔', label: 'Alerts' },
  { key: 'profile', icon: '👤', label: 'Profile' },
];

export default function BottomNav({ current, navigate }) {
  return (
    <div className="bottom-nav">
      {tabs.map(t => (
        <div key={t.key} className={`nav-item ${current === t.key ? 'active' : ''}`} onClick={() => navigate(t.key)}>
          <span className="nav-icon">{t.icon}</span>
          <span className="nav-label">{t.label}</span>
        </div>
      ))}
    </div>
  );
}
