import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I’m your first‑aid assistant. How can I help?' }
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
        model: 'llama3.1'
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
      <div className="sidebar">
        <h1>First‑Aid Assistant</h1>
        <p>Get immediate guidance on handling medical emergencies. Whether it's a cut, burn, or allergic reaction, our assistant provides step-by-step instructions to help you respond effectively.</p>
      </div>
      <div className="chat-container">
        <div className="app-header">
          <h1>Chat with Assistant</h1>
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
  );
}

export default App;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [messages, setMessages] = useState([
//     { sender: 'bot', text: 'Hi! I’m your first‑aid assistant. How can I help?' }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const send = async () => {
//     if (!input.trim()) return;
//     const userMsg = { sender: 'user', text: input };
//     const newMessages = [...messages, userMsg];
//     setMessages(newMessages);
//     console.log('Messages:', newMessages);
//     setInput('');
//     setLoading(true);

//     try {
//       const resp = await axios.post('http://localhost:8000/generate', {
//         prompt: input,
//         model: 'llama3.1'
//       }, { headers: { 'Content-Type': 'application/json' } });

//       const botText = resp.data.generated_text || '';
//       const botMsg = { sender: 'bot', text: botText || '... no response ...' };
//       const final = [...newMessages, botMsg];
//       setMessages(final);
//       console.log('Messages:', final);
//     } catch (err) {
//       console.error('Backend error:', err);
//       const errMsg = {
//         sender: 'bot',
//         text: 'Sorry, I didn’t receive a response. Please try again.'
//       };
//       const final = [...newMessages, errMsg];
//       setMessages(final);
//       console.log('Messages:', final);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="sidebar">
//         <h1>First‑Aid Assistant</h1>
//         <p>Get immediate guidance on handling medical emergencies. Whether it's a cut, burn, or allergic reaction, our assistant provides step-by-step instructions to help you respond effectively.</p>
//       </div>
//       <div className="chat-container">
//         <div className="app-header">
//           <h1>Chat with Assistant</h1>
//         </div>
//         <div className="messages">
//           {messages.map((m, idx) => (
//             <div key={idx} className={`msg ${m.sender}`}>
//               {m.text}
//             </div>
//           ))}
//           {loading && (
//             <div className="msg bot">
//               Typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
//             </div>
//           )}
//         </div>
//         <div className="input-row">
//           <input
//             value={input}
//             onChange={e => setInput(e.target.value)}
//             onKeyDown={e => e.key === 'Enter' && send()}
//             placeholder="Ask about first aid..."
//             disabled={loading}
//           />
//           <button onClick={send} disabled={loading}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [messages, setMessages] = useState([
//     { sender: 'bot', text: 'Hi! I’m your first‑aid assistant. How can I help?' }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const send = async () => {
//     if (!input.trim()) return;
//     const userMsg = { sender: 'user', text: input };
//     const newMessages = [...messages, userMsg];
//     setMessages(newMessages);
//     console.log('Messages:', newMessages);
//     setInput('');
//     setLoading(true);

//     try {
//       const resp = await axios.post('http://localhost:8000/generate', {
//         prompt: input,
//         model: 'llama3.1'
//       }, { headers: { 'Content-Type': 'application/json' } });

//       const botText = resp.data.generated_text || '';
//       const botMsg = { sender: 'bot', text: botText || '... no response ...' };
//       const final = [...newMessages, botMsg];
//       setMessages(final);
//       console.log('Messages:', final);
//     } catch (err) {
//       console.error('Backend error:', err);
//       const errMsg = {
//         sender: 'bot',
//         text: 'Sorry, I didn’t receive a response. Please try again.'
//       };
//       const final = [...newMessages, errMsg];
//       setMessages(final);
//       console.log('Messages:', final);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app-wrapper">
//       <header className="app-header">
//         <h1>First‑Aid Chat Assistant</h1>
//       </header>
//       <div className="chat-container">
//         <div className="messages">
//           {messages.map((m, idx) => (
//             <div key={idx} className={`msg ${m.sender}`}>
//               {m.text}
//             </div>
//           ))}
//           {loading && (
//             <div className="msg bot">
//               Typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
//             </div>
//           )}
//         </div>
//         <div className="input-row">
//           <input
//             value={input}
//             onChange={e => setInput(e.target.value)}
//             onKeyDown={e => e.key === 'Enter' && send()}
//             placeholder="Ask about first aid..."
//             disabled={loading}
//           />
//           <button onClick={send} disabled={loading}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }
// 
// export default App;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [messages, setMessages] = useState([
//     { sender: 'bot', text: 'Hi! I`m your first-aid assistant. How can I help?' }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const send = async () => {
//     if (!input.trim()) return;
//     const userMsg = { sender: 'user', text: input };
//     const newMessages = [...messages, userMsg];
//     setMessages(newMessages);
//     console.log('Messages:', newMessages);
//     setInput('');
//     setLoading(true);

//     try {
//       const resp = await axios.post('http://localhost:8000/generate', {
//         prompt: input,
//         model: 'viveksil/prathamops-en-E2B'
//       }, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const botText = resp.data.generated_text || '';
//       const botMsg = { sender: 'bot', text: botText || '... no response ...' };
//       const final = [...newMessages, botMsg];
//       setMessages(final);
//       console.log('Messages:', final);
//     } catch (err) {
//       console.error('Backend error:', err);
//       const errMsg = {
//         sender: 'bot',
//         text: 'Sorry, I didn`t receive a response. Please try again.'
//       };
//       const final = [...newMessages, errMsg];
//       setMessages(final);
//       console.log('Messages:', final);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages">
//         {messages.map((m, idx) => (
//           <div key={idx} className={`msg ${m.sender}`}>
//             {m.text}
//           </div>
//         ))}
//         {loading && (
//           <div className="msg bot">
//             Typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
//           </div>
//         )}
//       </div>
//       <div className="input-row">
//         <input
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           onKeyDown={e => e.key === 'Enter' && send()}
//           placeholder="Ask about first aid..."
//           disabled={loading}
//         />
//         <button onClick={send} disabled={loading}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [messages, setMessages] = useState([
//     { sender: 'bot', text: 'Hi! I`m your first-aid assistant. How can I help?' }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const send = async () => {
//     if (!input.trim()) return;
//     const userMsg = { sender: 'user', text: input };
//     const newMessages = [...messages, userMsg];
//     setMessages(newMessages);
//     console.log('Messages:', newMessages);
//     setInput('');
//     setLoading(true);

//     try {
//       const resp = await axios.post('http://localhost:8000/generate', {
//         prompt: input,
//         model: 'viveksil/prathamops-en-E2B'  // adjust model name as needed
//       }, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       const botText = resp.data.generated_text || '';
//       const botMsg = { sender: 'bot', text: botText || '... no response ...' };
//       const final = [...newMessages, botMsg];
//       setMessages(final);
//       console.log('Messages:', final);
//     } catch (err) {
//       console.error('Backend error:', err);
//       const errMsg = {
//         sender: 'bot',
//         text: 'Sorry, I didn`t receive a response. Please try again.'
//       };
//       const final = [...newMessages, errMsg];
//       setMessages(final);
//       console.log('Messages:', final);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages">
//         {messages.map((m, idx) => (
//           <div key={idx} className={`msg ${m.sender}`}>
//             {m.text}
//           </div>
//         ))}
//         {loading && (
//           <div className="msg bot">
//             Typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
//           </div>
//         )}
//       </div>

//       <div className="input-row">
//         <input
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           onKeyDown={e => e.key === 'Enter' && send()}
//           placeholder="Ask about first aid..."
//           disabled={loading}
//         />
//         <button onClick={send} disabled={loading}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default App;
