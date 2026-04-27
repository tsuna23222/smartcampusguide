import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { mockRooms } from '../data/mockData';

export default function MapPage({ navigate, mapRoom }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(
    mapRoom ? { building: mapRoom.building, room_number: mapRoom.room, floor: mapRoom.floor, directions: `Go to ${mapRoom.building}. Take stairs/elevator to the ${mapRoom.floor} floor. Find Room ${mapRoom.room}.` } : null
  );

  const filtered = mockRooms.filter(r =>
    r.building.toLowerCase().includes(search.toLowerCase()) ||
    r.room_number.toLowerCase().includes(search.toLowerCase())
  );

  const buildings = [...new Set(mockRooms.map(r => r.building))];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F4F6F5' }}>
      {/* Map visual area */}
      <div style={{
        height: 230, background: 'linear-gradient(135deg, #C8DDD6 0%, #A8C9BF 100%)',
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {/* Search bar */}
        <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', alignItems: 'center', background: 'white', borderRadius: 24, padding: '10px 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: 16, marginRight: 8, color: '#999' }}>🔍</span>
          <input style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14, fontFamily: 'DM Sans, sans-serif', color: '#333', background: 'transparent' }}
            placeholder="Search building or room..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Campus map illustration */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 6 }}>🏫</div>
          <p style={{ fontSize: 13, color: '#5A7A72', fontWeight: 500 }}>University Campus</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {buildings.slice(0, 3).map(b => (
              <span key={b} style={{ background: '#008B74', color: 'white', fontSize: 10, padding: '4px 10px', borderRadius: 10, cursor: 'pointer' }}
                onClick={() => setSearch(b)}>
                {b.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Direction card if room selected */}
        {selected && (
          <div className="card fade-up" style={{ borderLeft: '4px solid #008B74', background: '#F0FAF7' }}>
            <p style={{ fontSize: 12, color: '#008B74', fontWeight: 600, marginBottom: 4 }}>🧭 NAVIGATING TO</p>
            <p style={{ fontSize: 17, fontWeight: 700, fontFamily: 'Sora, sans-serif', marginBottom: 6 }}>
              Room {selected.room_number} · {selected.building}
            </p>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>📍 {selected.floor} Floor</p>
            <div style={{ background: 'white', borderRadius: 12, padding: 14, marginBottom: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#333' }}>📋 Directions:</p>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7 }}>{selected.directions}</p>
            </div>
            <button className="btn-outline" style={{ padding: '9px', fontSize: 13 }} onClick={() => setSelected(null)}>
              Clear Navigation
            </button>
          </div>
        )}

        {!selected && (
          <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📍</div>
            <p style={{ fontSize: 17, fontWeight: 700, fontFamily: 'Sora, sans-serif' }}>Select a Destination</p>
            <p style={{ fontSize: 13, color: '#999', marginTop: 4 }}>Choose a room below to get directions</p>
          </div>
        )}

        <p className="section-title" style={{ marginTop: selected ? 4 : 16 }}>
          {search ? `Results for "${search}"` : 'All Rooms'}
        </p>

        {filtered.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 24 }}>
            <p style={{ color: '#999' }}>No rooms found for "{search}"</p>
          </div>
        ) : (
          filtered.map((room, i) => (
            <div key={i} className="card" style={{ cursor: 'pointer', transition: 'all 0.15s', border: selected?.room_number === room.room_number ? '1.5px solid #008B74' : '1px solid #E8EAE9' }}
              onClick={() => setSelected(room)}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15 }}>Room {room.room_number}</p>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 3 }}>{room.building}</p>
                  <p style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{room.floor} Floor</p>
                </div>
                <div style={{ color: '#008B74', fontSize: 22 }}>→</div>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav current="map" navigate={navigate} />
    </div>
  );
}
