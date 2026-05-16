import React from 'react';

export default function PendingPage({ currentUser, logout, navigate }) {
  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(160deg, #008B74 0%, #005C4E 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 28px', textAlign: 'center'
    }}>
      <div className="fade-up">
        {/* Pending icon */}
        <div style={{
          width: 110, height: 110, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 52, margin: '0 auto 28px',
        }}>⏳</div>

        <h1 style={{ fontFamily: 'Sora, sans-serif', color: 'white', fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
          Account Pending
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 8 }}>
          Hi, <strong>{currentUser?.name || 'Student'}!</strong>
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.7, marginBottom: 32, maxWidth: 320 }}>
          Your account has been submitted and is waiting for verification by the Registrar's Office.
          You will be able to access the app once your enrollment is confirmed.
        </p>

        {/* Status card */}
        <div style={{
          background: 'rgba(255,255,255,0.12)', borderRadius: 16,
          padding: '20px 24px', marginBottom: 32, width: '100%', maxWidth: 320
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Student ID</span>
            <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{currentUser?.student_id || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Course</span>
            <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{currentUser?.course || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Status</span>
            <span style={{ background: '#FFF3E0', color: '#E65100', fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 20 }}>
              ⏳ Pending
            </span>
          </div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 24 }}>
          Please visit the Registrar's Office or wait for email confirmation.
        </p>

        {/* Check status button */}
        <button className="btn-ghost" style={{ marginBottom: 12 }} onClick={async () => {
          try {
            const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/me`, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            if (data.student?.status === 'verified') {
              navigate('dashboard');
            } else if (data.student?.status === 'rejected') {
              alert('Your account has been rejected. Please contact the Registrar.');
            } else {
              alert('Your account is still pending verification.');
            }
          } catch {
            alert('Cannot connect to server.');
          }
        }}>
          🔄 Check Verification Status
        </button>

        <p className="link-text" style={{ opacity: 0.7 }} onClick={logout}>
          Logout
        </p>
      </div>
    </div>
  );
}
