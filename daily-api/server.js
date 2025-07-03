require('dotenv').config();
require('./src/config/db'); //aqui importar a conexão com o banco
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Rotas de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Daily rodando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});