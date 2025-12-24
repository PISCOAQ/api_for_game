const mongoose = require('mongoose');

const BambinoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },

  // puoi aggiungere nuovi campi in futuro, per ora teniamolo semplice
}, {
  timestamps: true
});

module.exports = mongoose.model('Bambino', BambinoSchema);
