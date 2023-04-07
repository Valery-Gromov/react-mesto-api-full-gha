import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from "react";

function Card(props) {
    const {card} = props;

    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(card);
    }

    function handleLikeClick() {
        props.onCardLike(card)
    }

    function handleDeleteClick() {
        props.onCardDelete(card)
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(owner => owner === currentUser._id);

    const cardLikeButtonClassName = ( 
        `element__like ${isLiked && 'element__like_type_active'}` 
      );

  return (
    <li className="elements__item element" >
        <img src={card.link} alt={card.name} className="element__photo" onClick={handleClick} />
        <div className="element__content">
            <h2 className="element__discription">{card.name}</h2>
            <div className="element__like-container">
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} ></button>
                <span className="element__like-counter">{card.likes.length}</span>
            </div>
        </div>
        {(isOwn && <button type="button" className="element__delete" onClick={handleDeleteClick} ></button>)}
    </li>
  );
}

export default Card;
