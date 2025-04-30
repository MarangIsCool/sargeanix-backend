// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const res = await fetch('https://sargeanix-ai-proxy.onrender.com/chat', {

      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are Nova, the futuristic AI assistant for Sargeanix. You speak with visionary intelligence, empathy, and precision. Help users navigate, learn, or dream boldly.'
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong with the AI' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//sargeanix-backend.onrender.com/chat
