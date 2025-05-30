import React, { useState } from 'react';
import axios from 'axios';

function ChatBox() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/.netlify/functions/openai', { prompt });
      setResponse(res.data.response);
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>InvestAI Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button type="submit">Ask</button>
      </form>
      <div>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default ChatBox;
