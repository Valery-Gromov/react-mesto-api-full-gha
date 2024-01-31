import { useRef, useEffect } from 'react';
import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const cardNameRef = useRef();
    const cardLinkRef = useRef();

    useEffect(() => {
        cardNameRef.current.value = '';
        cardLinkRef.current.value = '';
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: cardNameRef.current.value,
            link: cardLinkRef.current.value
          });
    }

    return (

        <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen && 'popup_opened'} title='Update your avatar' name='upload' buttonSave='Save' onClose={props.onClose}>
                <label className="popup__label popup__label_type_place-name">
                    <input ref={cardNameRef} id="place-name-input" name="popup-place-name" type="text" placeholder="Title"
                        className="popup__field popup__field_type_place-name" required minLength="2" maxLength="30" />
                    <span id="place-name-input-error" className="popup__field-error"></span>
                </label>
                <label className="popup__label popup__label_type_place-link">
                    <input ref={cardLinkRef} id="place-link-input" name="popup-place-link" type="url" placeholder="Link to the picture"
                        className="popup__field popup__field_type_place-link" required />
                    <span id="place-link-input-error" className="popup__field-error"></span>
                </label>
        </PopupWithForm>

    );
}

export default AddPlacePopup;