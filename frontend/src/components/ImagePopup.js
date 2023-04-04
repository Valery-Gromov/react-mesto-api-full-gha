import closePopupButtonImage from '../images/button__cross.svg'


function ImagePopup(props) {
  const {card, onClose} = props;

  return (
    <div className={`popup popup_type_image ${card.link && 'popup_opened'}`}>
        <div className="popup__container popup__container_type_image">
            <img src={card.link} alt={card.name} className="popup__image" />
            <h2 className="popup__header popup__header_place_image">{card.name}</h2>
            <button className="popup__close popup__close_place_image item-animation"><img src={closePopupButtonImage}
                    alt="закрыть" className="popup__close-cross" onClick={onClose} />
            </button>
        </div>
    </div>
  );
}

export default ImagePopup;
