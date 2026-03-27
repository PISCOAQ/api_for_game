const utente = require('../models/utente');
const Utente = require('../models/utente');
const generaCodiceGiocoUnico = require('../utils/codiceGiocoGenerator');

// POST /utente
const creaUtente = async (req, res) => {
  try {
    const { nome, cognome, dataNascita, sesso, email, numTelefono, scuolaFrequentata, titoloStudio } = req.body;
    const codiceGioco = await generaCodiceGiocoUnico();
    const nuovoUtente = await Utente.create({
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
    res.status(201).json({nuovoUtente});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /utente
const listaUtenti = async (req, res) => {
  try {
    const utenti = await Utente.find();
    res.json(utenti);
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

    const utente = await Utente.findById(id);

    if (!utente) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }

    // evita duplicati
    const giàAssegnato = utente.percorsiAssegnati.some(
      p => p.percorsoIdEsterno === percorsoIdEsterno
    );

    if (giàAssegnato) {
      return res.status(200).json({ message: 'Percorso già assegnato' });
    }

    utente.percorsiAssegnati.push({
      percorsoIdEsterno,
      nomePercorso
    });

    await utente.save();

    res.status(200).json({utente});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
};

const getPercorsiAssegnati = async (req, res) => {
  try {
    const { codiceGioco } = req.params;

    const utente = await Utente.findOne({ codiceGioco }).select('percorsiAssegnati');

    if (!utente) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }

    res.status(200).json(utente.percorsiAssegnati);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore server' });
  }
};

// PATCH /utenti/:codiceGioco/progressi
const updateProgressiGioco = async (req, res) => {
  try {
    const { codiceGioco } = req.params;
    const { tipoAvatar, Livello_Attuale, PosizioneX, PosizioneY, lookAttuale, inventario, moneteNotifier, ctxId } = req.body;

    // Costruisco oggetto aggiornamenti SOLO con campi permessi
    const aggiornamenti = {};

    if (inventario && typeof inventario === "object") {
      aggiornamenti.inventario = inventario;
    }

    if (lookAttuale && typeof lookAttuale === "object") {
      aggiornamenti.lookAttuale = lookAttuale;
    }

    if (typeof tipoAvatar === "number") {
      aggiornamenti.tipoAvatar = tipoAvatar;
    }

    if (typeof Livello_Attuale === "number") {
      aggiornamenti.Livello_Attuale = Livello_Attuale;
    }

    if (typeof PosizioneX === "number") {
      aggiornamenti.PosizioneX = PosizioneX;
    }

    if (typeof PosizioneY === "number") {
      aggiornamenti.PosizioneY = PosizioneY;
    }

    if (typeof moneteNotifier === "number") {
      aggiornamenti.moneteNotifier = moneteNotifier;
    }

    if (typeof ctxId === "string") {
      aggiornamenti.ctxId = ctxId;
    }



    if (Object.keys(aggiornamenti).length === 0) {
      return res.status(400).json({
        message: "Nessun campo valido da aggiornare"
      });
    }

    console.log("Aggiornamenti inviati:", aggiornamenti);


    const utenteAggiornato = await Utente.findOneAndUpdate(
      { codiceGioco },
      { $set: aggiornamenti },
      { new: true }
    );

    if (!utenteAggiornato) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    res.status(200).json(utenteAggiornato);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore server" });
  }
};

const getDatiUtentePerGioco = async (req, res) => {
  try {
    const { codiceGioco } = req.params;

    // Trova il utente tramite codiceGioco
    const utente = await Utente.findOne(
      { codiceGioco },
      'tipoAvatar Livello_Attuale PosizioneX PosizioneY lookAttuale inventario moneteNotifier ctxId' // campi da restituire
    );

    if (!utente) {
      return res.status(404).json({ error: 'Codice gioco non valido' });
    }

    // Risposta JSON al gioco
    res.json(utente);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports = {
  creaUtente,
  listaUtenti,
  assegnaPercorso,
  getPercorsiAssegnati,
  updateProgressiGioco,
  getDatiUtentePerGioco,
};
