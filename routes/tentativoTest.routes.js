const express = require('express');
const router = express.Router();
const {
  creaTentativo
} = require('../controllers/tentativoTest.controller');

const handler = creaTentativo;
console.log("COSA STO PASSANDO:", handler);
console.log("TIPO:", typeof handler);


router.post('/tentativoTest', creaTentativo);

module.exports = router;