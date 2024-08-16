'use client';

import React, { useState } from 'react';
import { FaPaperPlane, FaRobot, FaUserCircle } from 'react-icons/fa';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChat([...chat, { sender: 'user', text: message }]);
    setLoading(true);
    setMessage('');

    try {
      // Send message to backend using fetch
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const reply = data.reply;

      // Add AI reply to chat
      setChat([...chat, { sender: 'user', text: message }, { sender: 'ai', text: reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-xl border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white">
        <div className="bg-blue-500 text-white text-center py-3">
          <h2 className="text-lg font-semibold">Chat with Us</h2>
        </div>
        <div className="flex flex-col h-[500px] w-full border-t border-gray-300">
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {chat.map((entry, index) => (
              <div
                key={index}
                className={`flex items-start mb-2 p-3 rounded-lg ${
                  entry.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                }`}
              >
                <div className="flex-shrink-0">
                  {entry.sender === 'user' ? (
                    <FaUserCircle className="text-white text-2xl" />
                  ) : (
                    <FaRobot className="text-gray-600 text-2xl" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p>{entry.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-2 p-3 rounded-lg bg-gray-200 text-gray-700 flex items-center">
                <FaRobot className="animate-spin text-gray-600 mr-2 text-2xl" />
                <span>Loading...</span>
              </div>
            )}
          </div>
          <div className="flex border-t border-gray-300 bg-white">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-2 border-none outline-none rounded-l-lg text-gray-800"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="p-2 bg-blue-500 text-white rounded-r-lg flex items-center disabled:bg-blue-300"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
