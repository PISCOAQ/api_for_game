const express = require("express");
const router = express.Router();

const excelController = require("../controllers/excel.controller");

router.get("/export/excel/:bambinoId", excelController.exportExcel);

module.exports = router;
