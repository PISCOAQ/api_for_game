const mongoose = require('mongoose');

const SCUOLE = [
  'Scuola_secondaria_di_primo_grado',
  'Scuola_secondaria_di_secondo_grado',
  'Universita',
  'Non_frequento',
  'Altro',
];

const TITOLI_STUDIO = [
  'Diploma_di_terza_media',
  'Diploma_di_scuola_superiore',
  'Laurea_di_I_livello',
  'Laurea_di_II_livello',
  'Master_dottorato_specializzazione',
]

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

  email: {
    type: String,
    required: false,
    lowercase: true,
    trim: true,
  },

  numTelefono: {
    type: String,
    required: false,
  },

  scuolaFrequentata: {
    type: String,
    enum: SCUOLE,
    required: true,
  },

  titoloStudio: {
    type: String,
    enum: TITOLI_STUDIO,
    required: true,
  },


}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Bambino', BambinoSchema);
