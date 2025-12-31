const Bambino = require('../models/bambino');
const TentativoTest = require('../models/tentativoTest');

const creaTentativo = async (req, res) => {
  try {
    const {
      bambinoId,
      percorso,
      fase,
      tentativo,
      risposteCorrette,
      tempoRisposta,
      superato
    } = req.body;

    if (
      !bambinoId ||
      !percorso ||
      !fase ||
      tentativo === undefined ||
      risposteCorrette === undefined ||
      tempoRisposta === undefined ||
      superato === undefined
    ) {
      return res.status(400).json({ error: 'Dati mancanti' });
    }

    const bambino = await Bambino.findById(bambinoId);
    if (!bambino) {
      return res.status(404).json({ error: 'Bambino non trovato' });
    }

    const nuovoTentativo = await TentativoTest.create({
      bambino: bambinoId,
      percorso,
      fase,
      tentativo,
      risposteCorrette,
      tempoRisposta,
      superato
    });

    res.status(201).json({
      message: 'Tentativo salvato correttamente',
      tentativo: nuovoTentativo
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
};

module.exports = { creaTentativo };
