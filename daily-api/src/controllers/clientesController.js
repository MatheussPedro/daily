const { prisma } = require('../config/db.js');

const criarCliente = async (req, res) => {
  const { nome, email, pass, tipo, endereco } = req.body;

  if (!nome || !email || !pass || !tipo || !endereco) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  try {
    const cliente = await prisma.Cliente.create({
      data: {
        nome,
        email,
        senha: pass,
        tipo,
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
      },
    });

    return res.status(201).json(cliente);
  } catch (error) {
    console.error('Erro Prisma:', error);
    return res.status(500).json({ error: 'Erro ao criar cliente', detalhes: error.message });
  }
};

module.exports = { criarCliente };