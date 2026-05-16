import React, { useState, useRef, useEffect } from 'react';

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyB0DbYfk6fsK2YWWjtnPfGnGY63Q3KaJTE';

const SYSTEM_CONTEXT = `You are CampusBot, a helpful assistant for SmartCampus Student Navigator app at a university in the Philippines. 
You help students with:
- Finding classrooms and buildings on campus
- Viewing their class schedules
- Understanding how to use the SmartCampus app
- Campus announcements and notifications
- General university information

Campus Information:
- Science & Tech Building: CS101 (Room 530, 5th floor), Computer Lab 1 (Room Lab1, 2nd floor)
- Main Building: Calculus (Room 210, 2nd floor), Filipino (Room 115, 1st floor), Auditorium (Ground floor)
- Liberal Arts Building: Technical Writing (Room 305, 3rd floor)
- Sports Complex: Gymnasium (Ground floor) for PE classes

App Features:
- Dashboard: Shows today's classes and upcoming schedule
- Schedule: Full weekly schedule Mon-Fri
- Map: Campus map with room directions
- Notifications: Real-time alerts for room changes
- Profile: Student info and settings

Admin info: Admin can approve or reject student registrations.
Default admin: admin@smartcampus.com

Keep answers short, friendly, and helpful. Use emojis occasionally. If asked something outside campus/app topics, politely redirect to campus-related help.`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! 👋 I\'m CampusBot! I can help you find classrooms, check schedules, and navigate the campus. What do you need help with?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const conversationHistory = messages
        .filter(m => m.role !== 'bot' || messages.indexOf(m) > 0)
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
            contents: [
              ...conversationHistory,
              { role: 'user', parts: [{ text: userMsg }] }
            ],
            generationConfig: { maxOutputTokens: 300, temperature: 0.7 }
          })
        }
      );

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not understand that. Please try again!';
      setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I\'m having trouble connecting. Please try again later!' }]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const quickQuestions = [
    'Where is Room 530?',
    'What is my schedule?',
    'How do I navigate to class?',
    'Where is the library?',
  ];

  return (
    <>
      {/* Floating button */}
      <button onClick={() => setOpen(o => !o)} style={{
        position: 'fixed', bottom: 90, right: 20, width: 54, height: 54,
        borderRadius: '50%', background: 'linear-gradient(135deg, #008B74, #005C4E)',
        border: 'none', cursor: 'pointer', fontSize: 24, boxShadow: '0 4px 16px rgba(0,139,116,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, transition: 'transform 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 155, right: 20, width: 320, height: 440,
          background: 'white', borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column', zIndex: 999,
          border: '1px solid #E8EAE9', overflow: 'hidden',
          animation: 'fadeUp 0.2s ease'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #008B74, #005C4E)',
            padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 18
            }}>🤖</div>
            <div>
              <p style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>CampusBot</p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>● Online · Powered by Gemini AI</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 4px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 10
              }}>
                {msg.role === 'bot' && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, marginRight: 6, flexShrink: 0, alignSelf: 'flex-end' }}>🤖</div>
                )}
                <div style={{
                  maxWidth: '75%', padding: '9px 13px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user' ? '#008B74' : '#F4F6F5',
                  color: msg.role === 'user' ? 'white' : '#1A1A1A',
                  fontSize: 13, lineHeight: 1.5,
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🤖</div>
                <div style={{ background: '#F4F6F5', borderRadius: '18px 18px 18px 4px', padding: '9px 13px' }}>
                  <span style={{ fontSize: 18, letterSpacing: 2 }}>···</span>
                </div>
              </div>
            )}

            {/* Quick questions - show only at start */}
            {messages.length === 1 && (
              <div style={{ marginTop: 4, marginBottom: 8 }}>
                <p style={{ fontSize: 11, color: '#999', marginBottom: 6 }}>Quick questions:</p>
                {quickQuestions.map((q, i) => (
                  <button key={i} onClick={() => { setInput(q); }} style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    background: '#E1F5EE', color: '#008B74', border: 'none',
                    borderRadius: 12, padding: '7px 12px', marginBottom: 5,
                    fontSize: 12, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                    transition: 'background 0.15s'
                  }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid #F0F0F0', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything..."
              style={{
                flex: 1, border: '1px solid #E8EAE9', borderRadius: 20,
                padding: '9px 14px', fontSize: 13, outline: 'none',
                fontFamily: 'DM Sans, sans-serif', color: '#333',
              }}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
              width: 36, height: 36, borderRadius: '50%', background: input.trim() ? '#008B74' : '#E0E0E0',
              border: 'none', cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, transition: 'background 0.2s', flexShrink: 0
            }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}