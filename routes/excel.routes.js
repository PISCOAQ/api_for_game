const express = require("express");
const router = express.Router();

const excelController = require("../controllers/excel.controller");

router.get("/export/excel/:utenteId", excelController.exportExcel);

module.exports = router;
