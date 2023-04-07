const Card = require('../models/card');
const NotFoundError = require('../utills/NotFoundError');
const NoRightsError = require('../utills/NoRightsError');

const getCards = (req, res, next) => Card.find({})
  .orFail(() => {
    throw new NotFoundError('Карточка не найдена');
  })
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new NoRightsError('Вы не можете удалить карточку другого пользователя');
      }
      return Card.findByIdAndDelete(req.params.id, { new: true })
        .orFail(() => {
          throw new NotFoundError('Карточка не найдена');
        })
        .then(() => res.send({ data: card }))
        .catch(next);
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, addLike, deleteLike,
};
