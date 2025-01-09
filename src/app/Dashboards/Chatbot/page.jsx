'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaPaperPlane, FaRobot, FaUserCircle } from 'react-icons/fa';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setChat([...chat, { sender: 'user', text: message }]);
    setLoading(true);
    setMessage('');

    try {
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
      const output = reply.replaceAll('**', ' ');
      const text_to_display = output.replaceAll('*', '\n \n');
      setChat([...chat, { sender: 'user', text: message }, { sender: 'ai', text: text_to_display }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: 'radial-gradient(circle, rgba(253, 248, 225, 1) 5%, rgba(109, 76, 65, 1) 81%)',
      }}
    >
      <div className="w-1/2 flex flex-col items-center p-8">
        <div className="w-full max-w-xl border border-[#6D4C41] rounded-lg shadow-lg overflow-hidden bg-white">
          <div className="bg-[#6D4C41] text-white text-center py-3">
            <h2 className="text-lg font-semibold">Chat with Us</h2>
          </div>
          <div className="flex flex-col h-[500px] w-full border-t border-[#6D4C41]">
            <div className="flex-1 p-4 overflow-y-auto bg-[#FDF8E1]">
              {chat.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-start mb-2 p-3 rounded-lg ${
                    entry.sender === 'user' ? 'bg-[#6D4C41] text-white' : 'bg-[#EDE0D4] text-[#6D4C41]'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {entry.sender === 'user' ? (
                      <FaUserCircle className="text-white text-2xl" />
                    ) : (
                      <FaRobot className="text-[#6D4C41] text-2xl" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p>{entry.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="mb-2 p-3 rounded-lg bg-[#EDE0D4] text-[#6D4C41] flex items-center">
                  <FaRobot className="animate-spin text-[#6D4C41] mr-2 text-2xl" />
                  <span>Loading...</span>
                </div>
              )}
            </div>
            <div className="flex border-t border-[#6D4C41] bg-white">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-2 border-none outline-none rounded-l-lg text-[#6D4C41]"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="p-2 bg-[#6D4C41] text-white rounded-r-lg flex items-center disabled:bg-[#5A3A35]"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex justify-center p-8 mt-12">
        <Image
          src="/WarrantBuddy.png" 
          alt="WarrantBuddy"
          className="w-[450px] h-[450px] object-cover rounded-xl shadow-md"
        />
      </div>
    </div>
  );
};

export default Chatbot;
