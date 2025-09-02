
const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, async (req, res) => {
  const { from, to, value } = req.body;

  if (!from || !to || typeof value !== 'number') {
    return res.status(400).json({ error: 'Campos obrigatórios: from, to, value' });
  }

  try {
    const transfer = await transferService.transfer({ from, to, value });
    res.status(201).json(transfer);
  } catch (err) {
    console.error('Erro na transferência:', err);
    // Se o erro lançado pelo service tiver status, use-o
    if (err.status) {
      return res.status(err.status).json({ error: err.message });
    }
    // fallback para 400
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;