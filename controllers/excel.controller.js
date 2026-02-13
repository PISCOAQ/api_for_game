const excelService = require("../services/excelService");
const Bambino = require("../models/bambino");
const TentativoTest = require("../models/tentativoTest");

exports.exportExcel = async (req, res) => {
  try {
    const { bambinoId } = req.params;

    console.log("bambinoId:", bambinoId);


    const bambino = await Bambino.findById(bambinoId);
    if (!bambino) {
      return res.status(404).json({ message: "Bambino non trovato" });
    }

    const tentativi = await TentativoTest.find({ bambinoId });

    const workbook = await excelService.createExcel(bambino, tentativi);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="report_${bambino.nome}.xlsx"`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore export Excel" });
  }
};
