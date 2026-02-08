const express = require('express');
const router = express.Router();
const {
  creaBambino,
  listaBambini,
  assegnaPercorso,
  getPercorsiAssegnati,
} = require('../controllers/bambino.controller');
const bambino = require('../models/bambino');

const {
  salvaDiagnosi,
  eliminaDiagnosi,
} = require('../controllers/diagnosi.controller');




router.post('/bambino', creaBambino);
router.get('/bambino', listaBambini);

router.post('/bambini/:id/assegna-percorso', assegnaPercorso);
router.get('/bambini/:codiceGioco/percorsi', getPercorsiAssegnati);

router.put('/bambini/:id/diagnosi', salvaDiagnosi);
router.delete('/bambini/:id/diagnosi', eliminaDiagnosi);


module.exports = router;