// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: { // у пользователя есть имя — опишем требования к имени в схеме:
    // type: mongoose.Schema.Types.Url, // имя — это строка
    type: String, // имя — это строка
    validate: {
      validator(v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid url`,
    },
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{ // описываем схему для одного элемента и заключаем её в квадратные скобки
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
