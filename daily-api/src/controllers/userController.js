import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { email, pass, confirmpass } = req.body;

    if (!email || !pass || !confirmpass) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    if (pass !== confirmpass) {
      return res.status(400).json({ error: 'As senhas não coincidem.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        pass: hashedPassword,
        tipo: '',
        name: '',
      },
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};