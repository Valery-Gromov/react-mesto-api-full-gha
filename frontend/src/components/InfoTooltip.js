import closePopupButtonImage from '../images/button__cross.svg'



function InfoTooltip(props) {

    return (
            <div className={`popup popup_type_image ${props.isOpen && 'popup_opened'}`}>
                <div className="popup__container popup__container_type_infotooltip">
                    <img src={props.image} className="popup__image" alt={props.text} />
                    <p className="popup__text">{props.text}</p>
                    <button className="popup__close popup__close_place_image item-animation"><img src={closePopupButtonImage}
                        alt="close" className="popup__close-cross" onClick={props.onClose} />
                    </button>
                </div>
            </div>
    );
}

export default InfoTooltip;
