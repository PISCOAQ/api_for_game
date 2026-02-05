const express = require('express');
const router = express.Router();
const {
  creaBambino,
  listaBambini,
  assegnaPercorso,
  getPercorsiAssegnati,
} = require('../controllers/bambino.controller');
const bambino = require('../models/bambino');


router.post('/bambino', creaBambino);
router.get('/bambino', listaBambini);

//POST -> assegna percorso
router.post('/bambini/by-codice/:codiceGioco/assegna-percorso', assegnaPercorso);

router.get('/bambini/:codiceGioco/percorsi', getPercorsiAssegnati);


module.exports = router;