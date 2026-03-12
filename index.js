require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const excelRoutes = require("./routes/excel.routes");
const healthRoutes = require("./routes/health.routes");

const app = express();

// Middleware
app.use(express.json());

// DB
connectDB();

// Routes
app.use(require('./routes/utente.routes'));
app.use('/api/tentativi-test', require('./routes/tentativoTest.routes'));
app.use(excelRoutes);
app.use('/api/health', healthRoutes);

// Avvio server
app.listen(3000, () => {
  console.log('Server avviato su http://localhost:3000');
});


