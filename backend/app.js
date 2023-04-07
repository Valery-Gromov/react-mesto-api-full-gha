/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const { createUser, login } = require('./controllers/usersControllers');
const auth = require('./middlewares/auth');
const NotFoundError = require('./utills/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(ftp|http|https):\/\/[^ "]+$/),
  }),
}), createUser);
app.use(auth);
app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log('shalom');
});
