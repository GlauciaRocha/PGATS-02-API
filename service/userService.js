const { users } = require('../model/userModel');

exports.register = (req, res) => {
  const { username, password, favorecidos = [] } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  users.push({ username, password, favorecidos, balance: 0 });
  res.status(201).json({ message: 'User registered successfully.' });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  res.json({ message: 'Login successful.' });
};

exports.getAll = (req, res) => {
  res.json(users.map(u => ({ username: u.username, favorecidos: u.favorecidos, balance: u.balance })));
};
