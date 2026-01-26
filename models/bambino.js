const mongoose = require('mongoose');

const BambinoSchema = new mongoose.Schema({
  nome: { 
    type: String,
    required: true
  },
  cognome: {
    type: String,
    required: true
  },
  dataNascita: {
    type: Date,
    required: true
  },
  sesso: {
    type: String,
    enum: ['maschio', 'femmina'],
    required: true
  },
  codiceGioco: {
    type: String,
    required: true,
    unique: true,
    index: true,
    immutable: true,
  },


}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Bambino', BambinoSchema);
