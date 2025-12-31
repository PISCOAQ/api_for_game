require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());

// DB
connectDB();

console.log(require('./routes/tentativoTest.routes'));


// Routes
app.use(require('./routes/bambino.routes'));
app.use(require('./routes/tentativoTest.routes'));

// Root test
/*app.get('/', (req, res) => {
  res.send('API funzionante!');
});*/

// Avvio server
app.listen(3000, () => {
  console.log('Server avviato su http://localhost:3000');
});
