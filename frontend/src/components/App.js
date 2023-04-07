import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/Api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip'
import * as mestoAuth from '../utils/mestoAuth.js'

function App() {
    const [isEditPopupIsOpen, setIsEditPopupIsOpen] = useState(false);
    const [isEditAvatarIsOpen, setIsEditAvatarIsOpen] = useState(false);
    const [isAddPlaceIsOpen, setIsAddPlaceIsOpen] = useState(false);
    const [isInfoTooltipIsOpen, setIsInfoTooltipIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [infoTooltipData, setInfoTooltipData] = useState({
        image: '',
        text: ''
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState('');

    const navigate = useNavigate();

    // Запрос данных профиля с сервера
    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            api.getProfile()
                .then(userData => {
                    setCurrentUser(userData)
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem('token');
                });
        };
    }, [loggedIn]);

    // Запрос карточек с сервера
    useEffect(() => {
        const jwt = localStorage.getItem('token');

        if (jwt) {
            api.getInitialCards()
                .then(cardsList => {
                    setCards(cardsList);
                })
                .catch(err => {
                    // тут ловим ошибку
                    console.log(err)
                });
        };
    }, [loggedIn]);

    // Проверка токена
    useEffect(() => {
        checkToken()
    }, []);

    function checkToken() {
        const jwt = localStorage.getItem('token');

        if (jwt) {
            mestoAuth.getToken(jwt)
                .then((res) => {
                    setLoggedIn(true);
                    navigate('/main', { replace: true });
                    setCurrentUserEmail(res.email);
                })
                .catch(err => {
                    console.log(err);
                });
        };
    };

    function handleLoginSubmit(userEmail, userPassword) {

        return mestoAuth.authorize(userEmail, userPassword)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    handleLogin();
                    navigate('/main', { replace: true });
                    setCurrentUserEmail(userEmail);
                }
            })
    }

    function handleEditProfileClick() {
        setIsEditPopupIsOpen(true);
    };

    function handleEditAvatarClick() {
        setIsEditAvatarIsOpen(true);
    };
    function handleAddPlaceClick() {
        setIsAddPlaceIsOpen(true);
    };
    function handleInfoTooltipIsOpen() {
        setIsInfoTooltipIsOpen(true)
    };

    function handleCardClick(card) {
        setSelectedCard(card);
    };

    function closeAllPopups() {
        setIsEditPopupIsOpen(false);
        setIsEditAvatarIsOpen(false);
        setIsAddPlaceIsOpen(false);
        setIsInfoTooltipIsOpen(false);
        setSelectedCard({});
    };

    function handleUpdateUser(data) {
        api.editProfile(data.name, data.about)
            .then(userData => {
                setCurrentUser(userData.data);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
    };

    function handleUpdateAvatar(data) {
        api.uploadAvatar(data.avatar)
            .then(userData => {
                setCurrentUser(userData.data);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
    };

    function handleAddPlaceSubmit(data) {
        api.addCard(data.name, data.link)
            .then(newCard => {
                setCards([newCard.data, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
    };

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(id => id === currentUser._id);

        if (!isLiked) {
            api.addLike(card._id)
                .then(newCard => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            api.deleteLike(card._id)
                .then(newCard => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => {
                    console.log(err);
                })
        }

    };

    function handleCardDelete(card) {

        api.deleteCard(card._id)
            .then(res => {
                setCards((state) => state.filter((c) => c._id !== card._id))
            })
            .catch(err => {
                console.log(err);
            })

    }

    function handleLogin() {
        setLoggedIn(true);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} currentUserEmail={currentUserEmail} />
            <Routes>
                <Route
                    path="/main"
                    element={<ProtectedRoute
                        loggedIn={loggedIn}
                        component={Main}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        onCardClick={handleCardClick}
                        handleEditAvatarClick={handleEditAvatarClick}
                        handleEditProfileClick={handleEditProfileClick}
                        handleAddPlaceClick={handleAddPlaceClick}
                    />}
                />
                <Route
                    path="/signup"
                    element={<Register setInfoTooltipData={setInfoTooltipData} handleInfoTooltipIsOpen={handleInfoTooltipIsOpen} />}
                />
                <Route
                    path="/signin"
                    element={<Login setInfoTooltipData={setInfoTooltipData} handleInfoTooltipIsOpen={handleInfoTooltipIsOpen} handleLoginSubmit={handleLoginSubmit} handleLogin={handleLogin} loggedIn={loggedIn} />}
                />
                <Route
                    path="*"
                    element={loggedIn ? <Navigate to="/main" /> : <Navigate to="/signin" />}
                />
            </Routes>
            <Footer />

            <EditAvatarPopup isOpen={isEditAvatarIsOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            <EditProfilePopup isOpen={isEditPopupIsOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlaceIsOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <InfoTooltip isOpen={isInfoTooltipIsOpen} image={infoTooltipData.image} text={infoTooltipData.text} onClose={closeAllPopups} />
            {/* <InfoTooltip image={imgFail} text="Что-то пошло не так! Попробуйте ещё раз." /> */}

        </CurrentUserContext.Provider>
    );
}

export default App;
