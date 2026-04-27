import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { mockSchedule } from '../data/mockData';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday'];

export default function SchedulePage({ navigate }) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const classes = mockSchedule[selectedDay] || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F4F6F5' }}>
      <div className="teal-header">
        <p className="header-title">📅 My Schedule</p>
        <p className="header-sub">Fall Semester 2026</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto', paddingBottom: 4 }}>
          {DAYS.map(d => (
            <button key={d} onClick={() => setSelectedDay(d)} style={{
              padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: selectedDay === d ? 'white' : 'rgba(255,255,255,0.2)',
              color: selectedDay === d ? '#008B74' : 'white',
              fontWeight: selectedDay === d ? 700 : 500, fontSize: 13,
              fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap', transition: 'all 0.2s'
            }}>{d.slice(0, 3)}</button>
          ))}
        </div>
      </div>

      <div className="page-content">
        {classes.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
            <p style={{ fontWeight: 600, color: '#333' }}>No classes on {selectedDay}!</p>
            <p style={{ color: '#999', fontSize: 13, marginTop: 6 }}>Enjoy your free day.</p>
          </div>
        ) : (
          classes.map((cls, i) => (
            <div key={i} className="card fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', letterSpacing: 0.5 }}>Lecture</span>
                <span className="badge badge-teal">{cls.subject_id}</span>
              </div>
              <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, fontFamily: 'Sora, sans-serif', color: '#1A1A1A' }}>
                {cls.subject_name}
              </p>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 3 }}>⏰ {cls.time}</p>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 3 }}>📍 Room {cls.room} · {cls.building}</p>
              <p style={{ fontSize: 13, color: '#666', marginBottom: 14 }}>👨‍🏫 {cls.instructor}</p>
              <button className="btn-nav" onClick={() => navigate('map', cls)}>
                🧭 Navigate Here
              </button>
            </div>
          ))
        )}
      </div>

      <BottomNav current="schedule" navigate={navigate} />
    </div>
  );
}
