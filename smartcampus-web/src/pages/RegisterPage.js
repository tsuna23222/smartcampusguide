import React, { useState } from 'react';

export default function RegisterPage({ navigate }) {
  const [form, setForm] = useState({ student_id: '', name: '', email: '', course: '', year_level: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setError('');
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || !form.student_id) { setError('Please fill all required fields.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('dashboard'); }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(160deg, #008B74 0%, #005C4E 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '40px 28px 32px', overflowY: 'auto'
    }}>
      <div className="fade-up" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', color: 'white', fontSize: 22, fontWeight: 700, marginBottom: 4, textAlign: 'center' }}>
          Welcome to SmartCampus!
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 24 }}>Fill up the forms</p>

        {error && <p style={{ color: '#FFD0D0', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>{error}</p>}

        <input className="input-field" placeholder="Student ID (e.g. 2026-00142)" value={form.student_id} onChange={handleChange('student_id')} />
        <input className="input-field" placeholder="Full Name" value={form.name} onChange={handleChange('name')} />
        <input className="input-field" placeholder="Email Address" type="email" value={form.email} onChange={handleChange('email')} />
        <input className="input-field" placeholder="Course (e.g. BS Computer Science)" value={form.course} onChange={handleChange('course')} />
        <input className="input-field" placeholder="Year Level (e.g. 1st Year)" value={form.year_level} onChange={handleChange('year_level')} />
        <input className="input-field" placeholder="Password" type="password" value={form.password} onChange={handleChange('password')} />
        <input className="input-field" placeholder="Confirm Password" type="password" value={form.confirm} onChange={handleChange('confirm')} />

        <button className="btn-ghost" style={{ marginTop: 8 }} onClick={handleRegister} disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="link-text" onClick={() => navigate('login')}>
          Already have an account? <u>Sign In</u>
        </p>
      </div>
    </div>
  );
}
