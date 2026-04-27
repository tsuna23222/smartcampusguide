import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { mockNotifications } from '../data/mockData';

const iconMap = { urgent: '⚠️', info: 'ℹ️', announcement: '📢' };
const bgMap = { urgent: '#FFF0F0', info: '#F5F5F5', announcement: '#F0F8FF' };
const borderMap = { urgent: '#FFCDD2', info: '#E0E0E0', announcement: '#BBDEFB' };

export default function NotificationsPage({ navigate }) {
  const [notifs, setNotifs] = useState(mockNotifications);

  const markRead = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const unread = notifs.filter(n => !n.read).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F4F6F5' }}>
      <div style={{ background: 'white', padding: '20px', borderBottom: '1px solid #E8EAE9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700 }}>🔔 Notifications</p>
          <p style={{ fontSize: 12, color: '#999', marginTop: 3 }}>Stay updated with campus news</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {unread > 0 && (
            <span style={{ background: '#008B74', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20 }}>
              {unread} new
            </span>
          )}
          <span style={{ fontSize: 20, cursor: 'pointer', color: '#999' }} title="Clear all" onClick={() => setNotifs(n => n.map(x => ({ ...x, read: true })))}>🗑️</span>
        </div>
      </div>

      <div className="page-content">
        {notifs.map((n, i) => (
          <div key={n.id} className="fade-up" style={{ animationDelay: `${i * 0.06}s` }}
            onClick={() => markRead(n.id)}>
            <div style={{
              borderRadius: 16, padding: '14px 16px', marginBottom: 12, cursor: 'pointer',
              background: bgMap[n.type], border: `1px solid ${borderMap[n.type]}`,
              opacity: n.read ? 0.65 : 1, transition: 'all 0.2s',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{iconMap[n.type]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: n.type === 'urgent' ? '#D32F2F' : '#1A1A1A' }}>{n.title}</p>
                    {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#008B74', flexShrink: 0 }} />}
                  </div>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{n.message}</p>
                  <p style={{ fontSize: 11, color: '#999', marginTop: 8 }}>{n.time}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav current="notifications" navigate={navigate} />
    </div>
  );
}
