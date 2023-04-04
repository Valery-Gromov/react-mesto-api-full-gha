import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as mestoAuth from '../utils/mestoAuth.js'
import imgSuccess from '../images/img-success.svg';
import imgFail from '../images/img-fail.svg';

function Register(props) {
  const [formValue, setFormValue] = useState({
    userEmail: '',
    userPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    // здесь обработчик регистрации
    const {userEmail, userPassword} = formValue;
    console.log(userEmail, userPassword);

    mestoAuth.register(userEmail, userPassword)
      .then((res) => {
        props.setInfoTooltipData({
          image: imgSuccess,
          text: 'Вы успешно зарегистрировались!'
        });
        console.log(res);
        props.handleInfoTooltipIsOpen();
        navigate('/signin', {replace: true});
      })
      .catch((err) => {
        console.log(err);
        props.setInfoTooltipData({
          image: imgFail,
          text: 'Что-то пошло не так! Попробуйте ещё раз.'
        });
        props.handleInfoTooltipIsOpen();
      })
  }

  return (
    <section className="sign-up">
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <h2 className="sign-up__title">
          Регистрация
        </h2>
        <input id="userEmail" name="userEmail" type="email" placeholder="Email" className="sign-up__input" required value={formValue.userEmail || ''} onChange={handleChange} />
        <input id="userPassword" name="userPassword" type="password" placeholder="Пароль" className="sign-up__input sign-up__input_password" value={formValue.userPassword || ''} required onChange={handleChange} />
        <button type="submit" className="sign-up__submit" >Зарегистрироваться</button>
        <p className="sign-up__text">
          Уже зарегистрированы? <Link to="/signin" className="sign-up__link" >Войти</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
