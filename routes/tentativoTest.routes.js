const express = require('express');
const router = express.Router();
const controller = require('../controllers/tentativoTest.controller');

// POST → salvare un tentativo
router.post('/', controller.createTentativoTest);

// GET → dati anagrafici del bambino per il gioco
router.get('/by-codice/:codiceGioco', controller.getDatiBambinoPerGioco);

// GET -> tutti i tentativi di un bambino tramite codiceGioco
router.get('/tentativi/:codiceGioco', controller.getTestByBambino);

module.exports = router;
