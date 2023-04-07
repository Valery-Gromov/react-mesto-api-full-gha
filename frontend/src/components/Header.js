import logo from '../images/logo__header.svg';
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();

  function signOut(){
    localStorage.removeItem('token');
    props.setLoggedIn(false);
    navigate('/signin');
  }

  
  return (
        <header className='header'>
            <img src={logo} alt="Логотип" className='header__logo'/>
            <nav>
              <ul className='header__menu'>
                {window.location.pathname === "/signup" && 
                (<li>
                  <Link to="/signin" className='header__button'>Войти</Link>
                </li>)}
                {window.location.pathname === "/signin" && 
                (<li>
                  <Link to="/signup" className='header__button'>Регистрация</Link>
                </li>)}
                {window.location.pathname === "/main" &&
                (<li>
                  <p className='header__login'>{props.currentUserEmail}</p>
                </li>)}
                {window.location.pathname === "/main" &&
                (<li>
                  <p onClick={signOut} className='header__button'>Выйти</p>
                </li>)}
              </ul>
            </nav>
        </header>
  );
}

export default Header;
