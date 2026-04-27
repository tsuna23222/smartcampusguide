import React, { useState } from 'react';

export default function LoginPage({ navigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) { setError('Please enter email and password.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('dashboard');
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(160deg, #008B74 0%, #005C4E 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '32px 28px', overflow: 'hidden', position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

      <div className="fade-up" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, marginBottom: 20
        }}>🌐</div>

        <h2 style={{ fontFamily: 'Sora, sans-serif', color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Welcome back</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 28 }}>Sign in to your account</p>

        {error && <p style={{ color: '#FFD0D0', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>{error}</p>}

        <input className="input-field" placeholder="Enter your Email" type="email"
          value={email} onChange={e => { setEmail(e.target.value); setError(''); }} />
        <input className="input-field" placeholder="Enter Password" type="password"
          value={password} onChange={e => { setPassword(e.target.value); setError(''); }} />

        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 20, cursor: 'pointer', alignSelf: 'center' }}>
          Forgot password?
        </p>

        <button className="btn-ghost" onClick={handleLogin} disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>

        <p className="link-text" onClick={() => navigate('register')}>
          Don't have an account? <u>Sign Up</u>
        </p>
        <p className="link-text" style={{ opacity: 0.6, marginTop: 8 }} onClick={() => navigate('splash')}>
          ← Back
        </p>
      </div>
    </div>
  );
}
