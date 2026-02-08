const Bambino = require('../models/bambino');

async function salvaDiagnosi(req, res) {
  try {
    const { testo, livelloGravita, note } = req.body;

    if (!testo || !livelloGravita) {
      return res.status(400).json({ message: 'Campi obbligatori mancanti' });
    }

    const bambino = await Bambino.findByIdAndUpdate(
      req.params.id,
      {
        diagnosi: {
          testo,
          livelloGravita,
          note: note ?? null,
          dataInserimento: new Date(),
        },
      },
      { new: true }
    );

    if (!bambino) {
      return res.status(404).json({ message: 'Bambino non trovato' });
    }

    res.status(200).json(bambino);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function eliminaDiagnosi(req, res) {
  try {
    const bambino = await Bambino.findByIdAndUpdate(
      req.params.id,
      { $unset: { diagnosi: "" } },
      { new: true }
    );

    if (!bambino) {
      return res.status(404).json({ message: 'Bambino non trovato' });
    }

    res.status(200).json(bambino);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  salvaDiagnosi,
  eliminaDiagnosi,
}