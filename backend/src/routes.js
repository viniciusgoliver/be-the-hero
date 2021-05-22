const express = require('express');

const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const PerfilOngController = require('./controllers/PerfilOngController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/casos', CasoController.index);
routes.post('/casos', CasoController.create);
routes.delete('/casos/:id', CasoController.delete);

routes.get('/perfil-ong', PerfilOngController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;