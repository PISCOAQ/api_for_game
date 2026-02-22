const Bambino = require('../models/bambino');
const TentativoTest = require('../models/tentativoTest');

/**
 * POST /api/tentativi-test
 * Salva un tentativo di test inviato dal gioco
 */
exports.createTentativoTest = async (req, res) => {
  try {
    const {
      codiceGioco,
      testId,
      nomeTest,
      tipoTest,
      percorsoId,
      superato,
      tempoMedioReazione,
      movimentoMouse,
      domande
    } = req.body;

    // Trova il bambino tramite codiceGioco
    const bambino = await Bambino.findOne({ codiceGioco });
    if (!bambino) {
      return res.status(404).json({ error: 'Codice gioco non valido' });
    }

    // Crea un nuovo tentativoTest
    const tentativo = new TentativoTest({
      bambinoId: bambino._id,
      testId,
      nomeTest,
      tipoTest,
      percorsoId,
      superato,
      tempoMedioReazione,
      movimentoMouse,
      domande
    });

    // Salva nel DB
    await tentativo.save();

    // Risposta OK
    res.status(201).json(tentativo);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// GET -> tutti i tentativi di un bambino
exports.getTestByBambino = async (req, res) => {
  try {
    const { codiceGioco } = req.params;

    const bambino = await Bambino.findOne({ codiceGioco });
    if (!bambino) return res.status(404).json({ message: 'Bambino non trovato' });

    const tentativi = await TentativoTest.find({ bambinoId: bambino._id });

    return res.status(200).json(tentativi);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Errore del server' });
  }
};

exports.getAllTentativi = async (req, res) => {
  try {
    const tentativi = await TentativoTest.find();
    return res.status(200).json(tentativi);
  } catch (error) {
    return res.status(500).json({ message: 'Errore server' });
  }
};


