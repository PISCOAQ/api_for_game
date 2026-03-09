const express = require('express');
const router = express.Router();
const {
  creaUtente,
  listaUtenti,
  assegnaPercorso,
  getPercorsiAssegnati,
  updateProgressiGioco,
  getDatiUtentePerGioco
} = require('../controllers/utente.controller');
const utente = require('../models/utente');

const {
  salvaDiagnosi,
  eliminaDiagnosi,
} = require('../controllers/diagnosi.controller');




router.post('/utente', creaUtente);
router.get('/utente', listaUtenti);

router.post('/utenti/:id/assegna-percorso', assegnaPercorso);
router.get('/utenti/:codiceGioco/percorsi', getPercorsiAssegnati);

router.patch('/utenti/:codiceGioco/progressi', updateProgressiGioco);
router.get('/utente/:codiceGioco', getDatiUtentePerGioco);

router.put('/utenti/:id/diagnosi', salvaDiagnosi);
router.delete('/utenti/:id/diagnosi', eliminaDiagnosi);


module.exports = router;