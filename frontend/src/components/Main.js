import { useContext, useEffect, useState } from 'react';

import profileEditButton from '../images/profile__edit-button.svg';
import profileAddButton from '../images/button__add.svg';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    // подписка на контекст CurrentUserContext
    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.handleEditAvatarClick}>
                    <img src={currentUser.avatar} alt="аватар пользователя" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <div className="profile__name-container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button item-animation" onClick={props.handleEditProfileClick}>
                            <img className="profile__edit-button-icon" src={profileEditButton}
                                alt="Кнопка изменить профиль" />
                        </button>
                    </div>
                    <p className="profile__discription">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button item-animation" onClick={props.handleAddPlaceClick}>
                    <img className="profile__add-button-icon" src={profileAddButton} alt="кнопка добавить пост" />
                </button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {
                        props.cards.map(card => {
                           return (<Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)
                        })
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;
