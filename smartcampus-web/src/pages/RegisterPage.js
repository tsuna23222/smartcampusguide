import React, { useState } from 'react';

export default function RegisterPage({ navigate }) {
  const [form, setForm] = useState({ student_id: '', name: '', email: '', course: '', year_level: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || !form.student_id) { setError('Please fill all required fields.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('dashboard'); }, 1000);
  };

  const Field = ({ placeholder, fkey, type = 'text' }) => (
    <input className="input-field" placeholder={placeholder} type={type}
      value={form[fkey]} onChange={e => { set(fkey, e.target.value); setError(''); }} />
  );

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

        <Field placeholder="Student ID (e.g. 2026-00142)" fkey="student_id" />
        <Field placeholder="Full Name" fkey="name" />
        <Field placeholder="Email Address" fkey="email" type="email" />
        <Field placeholder="Course (e.g. BS Computer Science)" fkey="course" />
        <Field placeholder="Year Level (e.g. 1st Year)" fkey="year_level" />
        <Field placeholder="Password" fkey="password" type="password" />
        <Field placeholder="Confirm Password" fkey="confirm" type="password" />

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
