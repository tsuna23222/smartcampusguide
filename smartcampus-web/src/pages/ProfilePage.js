import React from 'react';
import BottomNav from '../components/BottomNav';
import { mockStudent } from '../data/mockData';

export default function ProfilePage({ navigate }) {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) navigate('splash');
  };

  const Row = ({ label, value, badge }) => (
    <div className="info-row">
      <span className="info-label">{label}</span>
      {badge
        ? <span className="badge badge-teal">{value}</span>
        : <span className="info-value">{value}</span>}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F4F6F5' }}>
      <div className="teal-header" style={{ paddingBottom: 28 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0
          }}>👤</div>
          <div>
            <p style={{ color: 'white', fontSize: 20, fontWeight: 700, fontFamily: 'Sora, sans-serif' }}>{mockStudent.name}</p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 3 }}>Student ID: {mockStudent.student_id}</p>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="card fade-up">
          <p style={{ fontSize: 11, color: '#999', letterSpacing: 0.8, marginBottom: 8, textTransform: 'uppercase' }}>Student Info</p>
          <Row label="Course" value={mockStudent.course} />
          <Row label="Year Level" value={mockStudent.year_level} />
          <Row label="Email" value={mockStudent.email} />
          <Row label="Status" value="Enrolled" badge />
        </div>

        <div className="card fade-up" style={{ animationDelay: '0.1s' }}>
          <p style={{ fontSize: 11, color: '#999', letterSpacing: 0.8, marginBottom: 8, textTransform: 'uppercase' }}>Quick Links</p>
          {[
            { icon: '📅', label: 'My Schedule', page: 'schedule' },
            { icon: '🗺️', label: 'Campus Map', page: 'map' },
            { icon: '🔔', label: 'Notifications', page: 'notifications' },
          ].map(item => (
            <div key={item.page} className="info-row" style={{ cursor: 'pointer' }} onClick={() => navigate(item.page)}>
              <span style={{ fontSize: 14 }}>{item.icon} {item.label}</span>
              <span style={{ color: '#008B74' }}>›</span>
            </div>
          ))}
        </div>

        <div className="card fade-up" style={{ animationDelay: '0.2s' }}>
          <p style={{ fontSize: 11, color: '#999', letterSpacing: 0.8, marginBottom: 8, textTransform: 'uppercase' }}>Settings</p>
          <div className="info-row"><span className="info-label">Notifications</span><span style={{ color: '#008B74', fontWeight: 500 }}>On</span></div>
          <div className="info-row"><span className="info-label">Language</span><span className="info-value">English</span></div>
          <div className="info-row"><span className="info-label">App Version</span><span className="info-value">v1.0.0</span></div>
        </div>

        <button className="btn-outline" style={{ marginTop: 8 }} onClick={handleLogout}>
          Logout
        </button>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#bbb', marginTop: 16 }}>
          SmartCampus · Building Tomorrow's Innovations
        </p>
      </div>

      <BottomNav current="profile" navigate={navigate} />
    </div>
  );
}
