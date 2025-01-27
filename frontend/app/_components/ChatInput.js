'use client';
import { useState } from 'react';

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border rounded placeholder:text-black text-black"
      />
      <button 
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!message.trim()}
      >
        Send
      </button>
    </form>
  );
}
