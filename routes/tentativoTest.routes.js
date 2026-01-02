const express = require('express');
const router = express.Router();
const {
  creaTentativo,
  getTentativibyBambino
} = require('../controllers/tentativoTest.controller');

router.post('/tentativoTest', creaTentativo);

router.get('/bambino/:bambinoId', getTentativibyBambino);

module.exports = router;