import { useState } from 'react';
import React from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Subscribing to the context
    const currentUser = React.useContext(CurrentUserContext);

    // After downloading the current user from the API
    // its data will be used in managed components.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (

        <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen && 'popup_opened'} title='Edit a profile' name='edit' buttonSave='Save' onClose={props.onClose}>
                <label className="popup__label popup__label_type_name">
                    <input id="name-input" name="name" type="text" placeholder="Name"
                        className="popup__field popup__field_type_name" required minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange} />
                    <span id="name-input-error" className="popup__field-error"></span>
                </label>
                <label className="popup__label popup__label_type_discription">
                    <input id="discription-input" name="discription" type="text" placeholder="Type of activity"
                        className="popup__field popup__field_type_discription" required minLength="2" maxLength="200" value={description || ''} onChange={handleDescriptionChange} />
                    <span id="discription-input-error" className="popup__field-error"></span>
                </label>
        </PopupWithForm>

    );
}

export default EditProfilePopup;