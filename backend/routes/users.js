/* eslint-disable no-unused-vars */
const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/usersControllers');

router.get('/', getUsers);

router.get('/me', celebrate({
  params: Joi.object().keys({
    me: Joi.string().alphanum(),
  }),
}), getCurrentUser);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(ftp|http|https):\/\/[^ "]+$/),
  }),
}), updateAvatar);

module.exports = router;
