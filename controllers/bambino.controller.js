const bambino = require('../models/bambino');
const Bambino = require('../models/bambino');
const generaCodiceGiocoUnico = require('../utils/codiceGiocoGenerator');

// POST /bambino
const creaBambino = async (req, res) => {
  try {
    const { nome, cognome, dataNascita, sesso, email, numTelefono, scuolaFrequentata, titoloStudio } = req.body;
    const codiceGioco = await generaCodiceGiocoUnico();
    const nuovoBambino = await Bambino.create({
      nome,
      cognome,
      dataNascita,
      sesso,
      email,
      numTelefono,
      scuolaFrequentata,
      titoloStudio,
      codiceGioco,
    });
    res.status(201).json({nuovoBambino});
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
