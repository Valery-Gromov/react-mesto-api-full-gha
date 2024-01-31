import closePopupButtonImage from '../images/button__cross.svg'

function PopupWithForm(props) {

  return (
        <div className={`popup popup_type_${props.name} ${props.isOpen}`} >
          <div className="popup__container">
              <h2 className="popup__header">{props.title}</h2>
              <form onSubmit={props.onSubmit} name={`popup-${props.name}`} className={`popup__form popup__form_type_${props.name}`} >
                  {props.children}
                  <button type="submit" className="popup__save">{props.buttonSave}</button>
              </form>
              <button className="popup__close popup__close_place_edit item-animation"><img src={closePopupButtonImage}
                      alt="close" className="popup__close-cross" onClick={props.onClose} /></button>
          </div>
        </div>
  );
}

export default PopupWithForm;
