import React from 'react';

export default function SplashPage({ navigate }) {
  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(160deg, #008B74 0%, #005C4E 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 32px', position: 'relative', overflow: 'hidden'
    }}>
      {/* decorative circles */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', bottom: 40, left: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

      <div className="fade-up" style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 52, marginBottom: 28, boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }}>🌐</div>

        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginBottom: 6, letterSpacing: 1 }}>WELCOME TO</p>
        <h1 style={{
          fontFamily: 'Sora, sans-serif', fontSize: 38, fontWeight: 700,
          color: 'white', marginBottom: 10, lineHeight: 1.1
        }}>Campus<br />Guide</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, letterSpacing: 0.5 }}>Building Tomorrow's Innovations</p>
      </div>

      <div className="fade-up" style={{ width: '100%', animationDelay: '0.15s' }}>
        <p style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontSize: 16, marginBottom: 16 }}>
          Let's Begin Your
        </p>
        <button className="btn-primary" style={{ background: 'white', color: '#008B74', fontSize: 17, fontFamily: 'Sora, sans-serif' }}
          onClick={() => navigate('login')}>
          Journey →
        </button>
      </div>
    </div>
  );
}
