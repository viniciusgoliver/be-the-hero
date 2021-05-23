const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');  

const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const PerfilOngController = require('./controllers/PerfilOngController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    cidade: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

routes.get('/casos', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), CasoController.index);

routes.post('/casos', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),     
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),        
    valor: Joi.number().required(),
  })
}), CasoController.create);

routes.delete('/casos/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), CasoController.delete);

routes.get('/perfil-ong', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),     
  }).unknown(),
}), PerfilOngController.index);

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  })
}), SessionController.create);

module.exports = routes;