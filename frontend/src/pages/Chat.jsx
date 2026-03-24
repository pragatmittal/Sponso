import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5001');

const Chat = ({ proposalId, receiverId, onClose }) => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/messages/proposal/${proposalId}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to fetch messages', err);
      }
    };
    fetchMessages();

    socket.emit('join_proposal', proposalId);

    socket.on('receive_message', (data) => {
      if (data.message.sender._id !== user.id) {
        setMessages((prev) => [...prev, data.message]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [proposalId, user.id]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/messages`, {
        proposalId,
        receiverId,
        content: newMessage
      });

      const savedMessage = res.data;
      setMessages((prev) => [...prev, savedMessage]);
      socket.emit('send_message', { proposalId, message: savedMessage });
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send', err);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '350px', background: '#1e1e2f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--primary)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
        <h4 style={{ margin: 0, color: 'white' }}>Live Negotiation</h4>
        <button onClick={onClose} style={{ width: 'auto', background: 'transparent', margin: 0, padding: 0, color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>&times;</button>
      </div>

      <div style={{ flex: 1, padding: '1rem', minHeight: '300px', maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {messages.map((msg, i) => {
          const isMe = msg.sender._id === user.id;
          return (
            <div key={i} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', background: isMe ? 'var(--primary)' : 'rgba(255,255,255,0.1)', padding: '0.6rem 1rem', borderRadius: '16px', borderBottomRightRadius: isMe ? '2px' : '16px', borderBottomLeftRadius: !isMe ? '2px' : '16px', maxWidth: '85%' }}>
              {!isMe && <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>{msg.sender.name}</span>}
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{msg.content}</p>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '0.5rem' }}>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." style={{ margin: 0 }} />
        <button type="submit" style={{ width: 'auto', margin: 0, padding: '0.85rem 1rem' }}>Send</button>
      </form>
    </div>
  );
};

export default Chat;
