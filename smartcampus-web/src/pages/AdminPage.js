import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function AdminPage({ logout, currentUser }) {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, verified: 0, rejected: 0 });
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => { loadData(); }, [filter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsData, statsData] = await Promise.all([
        api.getStudents(filter),
        api.getStats(),
      ]);
      setStudents(studentsData.students || []);
      setStats(statsData.stats || {});
    } catch { }
    setLoading(false);
  };

  const handleVerify = async (id) => {
    setActionLoading(id + 'verify');
    await api.verifyStudent(id);
    await loadData();
    setActionLoading(null);
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this student?')) return;
    setActionLoading(id + 'reject');
    await api.rejectStudent(id);
    await loadData();
    setActionLoading(null);
  };

  const statusColor = { pending: '#E65100', verified: '#2E7D32', rejected: '#C62828' };
  const statusBg = { pending: '#FFF3E0', verified: '#E8F5E9', rejected: '#FFEBEE' };

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6F5', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #008B74, #005C4E)', padding: '20px', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 13, opacity: 0.8 }}>Admin Panel</p>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 700 }}>SmartCampus</p>
            <p style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>Welcome, {currentUser?.name}</p>
          </div>
          <button onClick={logout} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', borderRadius: 20, padding: '8px 16px', cursor: 'pointer', fontSize: 13 }}>
            Logout
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 20 }}>
          {[
            { label: 'Total', value: stats.total, color: 'white' },
            { label: 'Pending', value: stats.pending, color: '#FFD54F' },
            { label: 'Verified', value: stats.verified, color: '#A5D6A7' },
            { label: 'Rejected', value: stats.rejected, color: '#EF9A9A' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', background: 'white', borderBottom: '1px solid #E8EAE9' }}>
        {['pending', 'verified', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            flex: 1, padding: '13px 0', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            background: 'transparent', fontFamily: 'DM Sans, sans-serif',
            color: filter === f ? '#008B74' : '#999',
            borderBottom: filter === f ? '2.5px solid #008B74' : '2.5px solid transparent',
            textTransform: 'capitalize', transition: 'all 0.2s'
          }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Students list */}
      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>Loading...</div>
        ) : students.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ fontSize: 32 }}>📭</p>
            <p style={{ color: '#999', marginTop: 8 }}>No {filter} students</p>
          </div>
        ) : (
          students.map(student => (
            <div key={student._id} style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 12, border: '1px solid #E8EAE9', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: 15, fontFamily: 'Sora, sans-serif' }}>{student.name}</p>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 2 }}>🆔 {student.student_id}</p>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 2 }}>📧 {student.email}</p>
                  <p style={{ fontSize: 12, color: '#666', marginTop: 2 }}>📚 {student.course} · {student.year_level}</p>
                </div>
                <span style={{
                  background: statusBg[student.status], color: statusColor[student.status],
                  fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20
                }}>
                  {student.status.toUpperCase()}
                </span>
              </div>

              {/* Action buttons for pending students */}
              {student.status === 'pending' && (
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <button onClick={() => handleVerify(student._id)} disabled={actionLoading === student._id + 'verify'}
                    style={{ flex: 1, background: '#008B74', color: 'white', border: 'none', borderRadius: 20, padding: '10px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>
                    {actionLoading === student._id + 'verify' ? '...' : '✅ Approve'}
                  </button>
                  <button onClick={() => handleReject(student._id)} disabled={actionLoading === student._id + 'reject'}
                    style={{ flex: 1, background: 'white', color: '#D32F2F', border: '1.5px solid #D32F2F', borderRadius: 20, padding: '10px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>
                    {actionLoading === student._id + 'reject' ? '...' : '❌ Reject'}
                  </button>
                </div>
              )}

              {/* Re-evaluate rejected students */}
              {student.status === 'rejected' && (
                <button onClick={() => handleVerify(student._id)}
                  style={{ width: '100%', background: '#E8F5E9', color: '#2E7D32', border: '1.5px solid #A5D6A7', borderRadius: 20, padding: '10px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'DM Sans, sans-serif', marginTop: 4 }}>
                  ✅ Approve Instead
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
