require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// 🔥 MIDDLEWARE (SEMPRE QUI)
app.use(express.json());

// Connessione al database
connectDB();

// Modelli
const Bambino = require('./models/bambino');

// ===== ROUTE =====

// CREAZIONE di un bambino
app.post('/bambino', async (req, res) => {
  try {
    const nuovoBambino = await Bambino.create(req.body);
    res.status(201).json(nuovoBambino);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LISTA di tutti i bambini
app.get('/bambino', async (req, res) => {
  try {
    const bambini = await Bambino.find();
    res.json(bambini);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test root
app.get('/', (req, res) => {
  res.send('API funzionante!');
});

// ===== AVVIO SERVER (SEMPRE PER ULTIMO) =====
app.listen(3000, () => {
  console.log('Server avviato su http://localhost:3000');
});
