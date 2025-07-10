const express = require('express')
const { criarCliente } = require ('../controllers/clientesController');

const router = express.Router();

router.post('/', criarCliente);

module.exports = router;