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

const getTentativibyBambino = async (req, res) => {
  try {
    const { bambinoId } = req.params;
    const { fase } = req.query;

    // filtro base
    const filtro = { bambino: bambinoId };

    // filtro opzionale
    if (fase) {
      filtro.fase = fase;
    }

    const tentativi = await TentativoTest
      .find(filtro)
      .sort({ createdAt: 1 });

    res.json(tentativi);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore del server' });
  }
};



module.exports = { creaTentativo, getTentativibyBambino };
