import React from 'react';
import BottomNav from '../components/BottomNav';
import { mockStudent, mockSchedule } from '../data/mockData';

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const today = days[new Date().getDay()] in mockSchedule ? days[new Date().getDay()] : 'Monday';
const todayClasses = mockSchedule[today] || mockSchedule['Monday'];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export default function DashboardPage({ navigate }) {
  const next = todayClasses[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F4F6F5' }}>
      {/* Header */}
      <div className="teal-header" style={{ paddingBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p className="header-greeting">{greeting()},</p>
            <p className="header-name">{mockStudent.name}</p>
            <div className="badge-row">
              <span className="badge badge-white">{mockStudent.year_level}</span>
              <span className="badge badge-white">{mockStudent.course}</span>
            </div>
          </div>
          <div style={{
            width: 46, height: 46, borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 22, cursor: 'pointer'
          }} onClick={() => navigate('profile')}>👤</div>
        </div>
      </div>

      <div className="page-content">
        {/* Up next card */}
        {next && (
          <div className="card fade-up" style={{ marginTop: -16, borderLeft: '4px solid #008B74' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <p style={{ fontSize: 12, color: '#999' }}>Up next · {today}</p>
              <span className="badge badge-orange">Room May Change</span>
            </div>
            <p style={{ color: '#008B74', fontSize: 13, fontWeight: 600 }}>{next.subject_id}</p>
            <p style={{ fontSize: 17, fontWeight: 700, margin: '3px 0 8px', fontFamily: 'Sora, sans-serif' }}>{next.subject_name}</p>
            <p style={{ fontSize: 13, color: '#555', marginBottom: 2 }}>⏰ {next.time}</p>
            <p style={{ fontSize: 13, color: '#555', marginBottom: 12 }}>📍 Room {next.room} · {next.building} ({next.floor} Floor)</p>
            <button className="btn-primary" style={{ padding: '10px', fontSize: 14 }}
              onClick={() => navigate('map', next)}>
              🧭 Navigate to Room
            </button>
          </div>
        )}

        <p className="section-title" style={{ marginTop: 4 }}>Today's Classes — {today}</p>

        {todayClasses.map((cls, i) => (
          <div key={i} className="card" style={{ cursor: 'pointer', transition: 'transform 0.15s' }}
            onClick={() => navigate('map', cls)}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 14 }}>{cls.subject_name}</p>
                <p style={{ fontSize: 12, color: '#999', marginTop: 3 }}>⏰ {cls.time}</p>
                <p style={{ fontSize: 12, color: '#999', marginTop: 2 }}>📍 {cls.building}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-teal" style={{ marginBottom: 6, display: 'block' }}>{cls.subject_id}</span>
                <p style={{ fontSize: 12, color: '#666' }}>Room {cls.room}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Quick links */}
        <p className="section-title" style={{ marginTop: 8 }}>Quick Access</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: '📅', label: 'Full Schedule', page: 'schedule' },
            { icon: '🗺️', label: 'Campus Map', page: 'map' },
            { icon: '🔔', label: 'Notifications', page: 'notifications' },
            { icon: '👤', label: 'My Profile', page: 'profile' },
          ].map(q => (
            <div key={q.page} className="card" style={{ cursor: 'pointer', textAlign: 'center', padding: '18px 12px' }}
              onClick={() => navigate(q.page)}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{q.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{q.label}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav current="dashboard" navigate={navigate} />
    </div>
  );
}
