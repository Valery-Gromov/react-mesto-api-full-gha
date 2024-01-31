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

    // here is the registration handler
    const {userEmail, userPassword} = formValue;

    mestoAuth.register(userEmail, userPassword)
      .then((res) => {
        props.setInfoTooltipData({
          image: imgSuccess,
          text: 'You have successfully registered!'
        });
        console.log(res);
        props.handleInfoTooltipIsOpen();
        navigate('/signin', {replace: true});
      })
      .catch((err) => {
        console.log(err);
        props.setInfoTooltipData({
          image: imgFail,
          text: 'Something went wrong! Try again.'
        });
        props.handleInfoTooltipIsOpen();
      })
  }

  return (
    <section className="sign-up">
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <h2 className="sign-up__title">
          Signup
        </h2>
        <input id="userEmail" name="userEmail" type="email" placeholder="Email" className="sign-up__input" required value={formValue.userEmail || ''} onChange={handleChange} />
        <input id="userPassword" name="userPassword" type="password" placeholder="Password" className="sign-up__input sign-up__input_password" value={formValue.userPassword || ''} required onChange={handleChange} />
        <button type="submit" className="sign-up__submit" >Signup</button>
        <p className="sign-up__text">
          Already signed up? <Link to="/signin" className="sign-up__link" >Login</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
