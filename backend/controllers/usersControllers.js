/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utills/NotFoundError');
const ExistingDataError = require('../utills/ExistingDataError');
const ValidationError = require('../utills/ValidationError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch(next);

const getUser = (req, res, next) => {
  const { id } = req.params;

  return User.findById(id)
    .orFail(() => {
      throw new NotFoundError('The user was not found');
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  return User.findById(id)
    .orFail(() => { throw new NotFoundError('The user was not found'); })
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
        next(new ExistingDataError('A user with this email already exists'));
      } else if (err.name === 'ValidationError') {
        next(new ValidationError('Incorrect data when creating the card'));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication is successful! the user in the user variable
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // return the token
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
      new: true, // the handler will then receive an updated entry as input
      runValidators: true, // the data will be validated before the change
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('The user was not found');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Incorrect data when creating the card'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // the handler will then receive an updated entry as input
      runValidators: true, // the data will be validated before the change
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('The user was not found');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Incorrect data when creating the card'));
      } else {
        next(err);
      }
    });
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
