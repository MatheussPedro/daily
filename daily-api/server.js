import 'dotenv/config';
import './src/config/db.js';
import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/auth/userRouts.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:8081',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Daily rodando!' });
});

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));