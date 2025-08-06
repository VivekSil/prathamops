import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am PrathamOps assistant. How can I help you ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    console.log('Messages:', newMessages);
    setInput('');
    setLoading(true);

    try {
      const resp = await axios.post('http://localhost:8000/generate', {
        prompt: input,
        model: 'viveksil/prathamops-en-E2B'
      }, { headers: { 'Content-Type': 'application/json' } });

      const botText = resp.data.generated_text || '';
      const botMsg = { sender: 'bot', text: botText || '... no response ...' };
      const final = [...newMessages, botMsg];
      setMessages(final);
      console.log('Messages:', final);
    } catch (err) {
      console.error('Backend error:', err);
      const errMsg = {
        sender: 'bot',
        text: 'Sorry, I didn’t receive a response. Please try again.'
      };
      const final = [...newMessages, errMsg];
      setMessages(final);
      console.log('Messages:', final);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* <div className="sidebar">
        <div className="sidebar-content">
          <h1>PrathamOps Assistant</h1>
          <p>A private AI-based guidance system on your device can give clear instructions immediately, bridging the gap between witnessing a crisis and skilled support—when every second counts.</p>
        </div>
      </div> */}
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-icon">⛑️</div>
            <h1>PrathamOps Assistant</h1>
            <p>Get quick guidance for common medical emergencies, step-by-step and easy to follow.</p>
              <div className="info-card">
                ✅ Instant tips for burns, cuts, and allergic reactions.
              </div>
              <div className="info-card">
                📌 Stay calm — we guide you in real-time.
              </div>
              <div className="info-card">
                ⏱️ Respond within the golden hour.
              </div>
          </div>
      </div>

      <div className="chat-container">
        <div className="chat-content">
          <div className="app-header">
            <h1>PrathamOps Assistant</h1>
          </div>
          <div className="messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`msg ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="msg bot">
                Typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
              </div>
            )}
          </div>
          <div className="input-row">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about first aid..."
              disabled={loading}
            />
            <button onClick={send} disabled={loading}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
