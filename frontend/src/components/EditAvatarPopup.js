import { useRef, useEffect } from 'react';
import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
          });
    }

    return (

        <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen && 'popup_opened'} title='Обновить аватар' name='upload' buttonSave='Сохранить' onClose={props.onClose}>
                <label className="popup__label popup__label_type_place-link">
                    <input ref={avatarRef} id="place-avatar-link-input" name="popup-place-link" type="url" placeholder="Ссылка на картинку"
                        className="popup__field popup__field_type_place-link" required />
                    <span id="place-avatar-link-input-error" className="popup__field-error"></span>
                </label>
        </PopupWithForm>

    );
}

export default EditAvatarPopup;