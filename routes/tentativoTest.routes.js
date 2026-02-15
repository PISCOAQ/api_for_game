const express = require('express');
const router = express.Router();
const controller = require('../controllers/tentativoTest.controller');

// POST → salvare un tentativo
router.post('/', controller.createTentativoTest);

// GET -> tutti i tentativi di un bambino tramite codiceGioco
router.get('/tentativi/:codiceGioco', controller.getTestByBambino);

module.exports = router;
