const express = require('express');
const app = express();

// Endpoint de reset para testes automatizados
if (process.env.NODE_ENV === 'test') {
	const { resetUsers } = require('./model/userModel');
	const { resetTransfers } = require('./model/transferModel');
	app.post('/test/reset', (req, res) => {
		resetUsers();
		resetTransfers();
		res.status(204).end();
	});
}
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', userController);
app.use('/transfers', transferController);

module.exports = app;