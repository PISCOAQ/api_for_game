const express = require('express');
const router = express.Router();
const {
  creaBambino,
  listaBambini
} = require('../controllers/bambino.controller');

router.post('/bambino', creaBambino);
router.get('/bambino', listaBambini);

module.exports = router;