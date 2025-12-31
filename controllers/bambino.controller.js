const Bambino = require('../models/bambino');

// POST /bambino
const creaBambino = async (req, res) => {
  try {
    const nuovoBambino = await Bambino.create(req.body);
    res.status(201).json(nuovoBambino);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /bambino
const listaBambini = async (req, res) => {
  try {
    const bambini = await Bambino.find();
    res.json(bambini);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  creaBambino,
  listaBambini
};
