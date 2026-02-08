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

const assegnaPercorso = async (req, res) => {
  try {
    const { id } = req.params;
    const { percorsoIdEsterno, nomePercorso } = req.body;

    if (!percorsoIdEsterno || !nomePercorso) {
      return res.status(400).json({ message: 'Dati percorso mancanti' });
    }

    const bambino = await Bambino.findById(id);

    if (!bambino) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }

    // evita duplicati
    const giàAssegnato = bambino.percorsiAssegnati.some(
      p => p.percorsoIdEsterno === percorsoIdEsterno
    );

    if (giàAssegnato) {
      return res.status(200).json({ message: 'Percorso già assegnato' });
    }

    bambino.percorsiAssegnati.push({
      percorsoIdEsterno,
      nomePercorso
    });

    await bambino.save();

    res.status(200).json({bambino});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
};

const getPercorsiAssegnati = async (req, res) => {
  try {
    const { codiceGioco } = req.params;

    const bambino = await Bambino.findOne({ codiceGioco }).select('percorsiAssegnati');

    if (!bambino) {
      return res.status(404).json({ message: 'Bambino non trovato' });
    }

    res.status(200).json(bambino.percorsiAssegnati);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
};




module.exports = {
  creaBambino,
  listaBambini,
  assegnaPercorso,
  getPercorsiAssegnati,
};
