const { users } = require('../model/userModel');

exports.transfer = (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== 'number') {
    return res.status(400).json({ message: 'From, to, and amount are required.' });
  }
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) {
    return res.status(404).json({ message: 'Sender or recipient not found.' });
  }
  if (sender.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance.' });
  }
  const isFavorecido = sender.favorecidos.includes(to);
  if (!isFavorecido && amount >= 5000) {
    return res.status(403).json({ message: 'Transfer above R$ 5.000,00 only allowed to favorecidos.' });
  }
  sender.balance -= amount;
  recipient.balance += amount;
  res.json({ message: 'Transfer successful.' });
};
