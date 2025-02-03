// backend/server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); // Cargar las variables de entorno desde .env

const app = express();
const port = 5000;

app.use(express.json()); // Permitir el envío de datos JSON

// Ruta para traducir texto
app.post('/translate', async (req, res) => {
  const { fromLanguage, toLanguage, text } = req.body;

  const apiKey = process.env.OPENAI_API_KEY;  // Obtén la clave desde las variables de entorno

  try {
    // Llamada a la API de OpenAI
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an AI that translates text.'
          },
          {
            role: 'user',
            content: `${text} {{${fromLanguage}}} [[${toLanguage}]]`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Enviar la respuesta de OpenAI al frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error al traducir:', error);
    res.status(500).json({ error: 'Error al traducir' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});

import dotenv from 'dotenv';
dotenv.config();
