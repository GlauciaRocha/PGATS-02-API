const { users } = require('../model/userModel');
const { transfers } = require('../model/transferModel');

function transfer({ from, to, value }) {
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) {
    const err = new Error('Usuário remetente ou destinatário não encontrado');
    err.status = 400;
    throw err;
  }
  if (sender.saldo < value) {
    const err = new Error('Saldo insuficiente');
    err.status = 400;
    throw err;
  }
  const isFavorecido = sender.favorecidos && sender.favorecidos.includes(to);
  if (!isFavorecido && value >= 5000) {
    const err = new Error('Transferência acima de R$ 5.000,00 só para favorecidos');
    err.status = 400;
    throw err;
  }
  sender.saldo -= value;
  recipient.saldo += value;
  const transfer = { from, to, value, date: new Date().toISOString() };
  transfers.push(transfer);
  return transfer;
}

function listTransfers() {
  return transfers;
}

module.exports = { transfer, listTransfers };