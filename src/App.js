import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const sendMessage = async () => {
    if (userMessage.trim() === '') return; // Don't send empty messages

    // Add user message to the chat
    const newMessages = [...messages, { text: userMessage, isUser: true }];
    setMessages(newMessages);
    setUserMessage('');

    // Send message to backend
    try {
      const response = await axios.post('https://my-chatbot-backend-etcb.onrender.com/message', { message: userMessage });
      // Add bot response to the chat
      setMessages([...newMessages, { text: response.data.response, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="App">
       <div className="header">
        Hey! Let's chat.
      </div>
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={msg.isUser ? 'user-message' : 'bot-message'}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;