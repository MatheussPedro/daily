const { prisma } = require('../config/db.js');
const bcrypt = require('bcrypt');

const criarCliente = async (req, res) => {
  const { nome, email, pass, tipo, endereco } = req.body;

  if (!nome || !email || !pass || !tipo || !endereco) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: await bcrypt.hash(pass, 10),
      },
    });

    const cliente = await prisma.cliente.create({
      data: {
        tipo,
        user: { connect: { id: user.id } },
        endereco: {
          create: {
            rua: endereco.rua,
            numero: endereco.numero,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            uf: endereco.uf,
            cep: endereco.cep,
          },
        },
      },
      include: {
        endereco: true,
        user: true,
      },
    });

    return res.status(201).json({ user, cliente });
  } catch (error) {
    console.error('Erro Prisma:', error);
    return res.status(500).json({
      error: 'Erro ao criar cliente',
      detalhes: error.message,
    });
  }
};

module.exports = { criarCliente };