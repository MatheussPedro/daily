require('dotenv').config();
require('./src/config/db');

const express = require('express');
const cors = require('cors');

const app = express();

// Habilita CORS
app.use(cors({
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Permite receber JSON
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API Daily rodando!' });
});

//rota de clientes
const clientesRoutes = require('./src/routes/clienteRouts');
app.use('/clientes', clientesRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});