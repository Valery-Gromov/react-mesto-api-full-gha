const Card = require('../models/card');
const NotFoundError = require('../utills/NotFoundError');
const NoRightsError = require('../utills/NoRightsError');
const ValidationError = require('../utills/ValidationError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Incorrect data when creating the card'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('The card was not found');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new NoRightsError('You cannot delete another users card');
      }
      return Card.findByIdAndDelete(req.params.id, { new: true })
        .orFail(() => {
          throw new NotFoundError('The card was not found');
        })
        .then(() => res.send({ data: card }))
        .catch(next);
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it is not there
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('The card was not found');
    })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('The card was not found');
    })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, addLike, deleteLike,
};
