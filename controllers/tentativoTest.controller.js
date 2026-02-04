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
      domande
    } = req.body;

    // 1️⃣ Trova il bambino tramite codiceGioco
    const bambino = await Bambino.findOne({ codiceGioco });
    if (!bambino) {
      return res.status(404).json({ error: 'Codice gioco non valido' });
    }

    // 2️⃣ Crea un nuovo tentativoTest
    const tentativo = new TentativoTest({
      bambinoId: bambino._id,
      testId,
      nomeTest,
      tipoTest,
      percorsoId,
      superato,
      tempoMedioReazione,
      domande
    });

    // 3️⃣ Salva nel DB
    await tentativo.save();

    // 4️⃣ Risposta OK
    res.status(201).json(tentativo);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDatiBambinoPerGioco = async (req, res) => {
  try {
    const { codiceGioco } = req.params;

    // 1️⃣ Trova il bambino tramite codiceGioco
    const bambino = await Bambino.findOne(
      { codiceGioco },
      'nome cognome scuolaFrequentata titoloStudio' // campi da restituire
    );

    if (!bambino) {
      return res.status(404).json({ error: 'Codice gioco non valido' });
    }

    // 2️⃣ Risposta JSON al gioco
    res.json(bambino);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
