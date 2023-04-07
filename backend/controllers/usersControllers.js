/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utills/NotFoundError');
const ExistingDataError = require('../utills/ExistingDataError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => User.find({})
  .then((users) => {
    if (!users) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(200).send(users);
  })
  .catch(next);

const getUser = (req, res, next) => {
  const { id } = req.params;

  return User.findById(id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  return User.findById(id)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash, err) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ExistingDataError('Пользователь с таким email уже существует'));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
