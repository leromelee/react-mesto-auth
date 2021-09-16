import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {

    const currentUser = React.useContext (CurrentUserContext);
    const [desc, setDesc] = React.useState ('');
    const [name, setName] = React.useState ('');


    React.useEffect (() => {
            setName (currentUser.name);
            setDesc (currentUser.about);
        }, [currentUser, isOpen]
    );

    function handleSubmit (e) {
        e.preventDefault ();

        onUpdateUser ({
            name: name,
            about: desc,
        });
    }

    function handleName (e) {
        setName (e.target.value);
    }
    function handleDesc (e) {
        setDesc (e.target.value);
    }

    return (
        <PopupWithForm name="profile" title="Редактировать профиль" buttonText="Сохранить"
                       isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="popup__input-container">
                <input type="text" required className="popup__input"
                    placeholder="Имя" name="personName" minLength="2" maxLength="40"
                       id="person-name" value={name || ''} onChange={handleName}
                />
                <span className="popup__error" />
            </div>
            <div className="popup__input-container">
                <input type="text" required className="popup__input"
                       placeholder="Профессия" name="personJob" minLength="2" maxLength="200"
                    id="person-job" value={desc || ''} onChange={handleDesc}
                />
                <span className="popup__error" />
            </div>
        </PopupWithForm>
    );
};

export default EditProfilePopup;


