const mongoose = require('mongoose');

const TentativoTestSchema = new mongoose.Schema({
  bambino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bambino',
    required: true
  },

  percorso: {
    type: String,
    required: true
  },

  fase: {
    type: String,
    enum: ['pre', 'post'],
    required: true
  },

  tentativo: {
    type: Number,
    required: true
  },

  risposteCorrette: {
    type: Number,
    required: true
  },

  tempoRisposta: {
    type: Number,
    required: true
  },

  superato: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TentativoTest', TentativoTestSchema);
