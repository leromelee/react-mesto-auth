import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState ('');
    const [link, setLink] = React.useState ('');



    function handleSubmit (e) {
        e.preventDefault ();
        onAddPlace({name, link});
        setName('');
        setLink('');
    }
    function handleChangeName (e) {
        setName (e.target.value);
    }
    function handleChangeLink (e) {
        setLink (e.target.value);
    }


    return (
        <PopupWithForm name="place" title="Новое место" buttonText="Создать"
                       isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="popup__input-container">
                <input name="name" id="name" type="text" required className="popup__input" minLength="2"
                       maxLength="30" placeholder="Название места" onChange={handleChangeName} value={name || ''} />
                <span className="popup__error" />
            </div>
            <div className="popup__input-container">
                <input name="link" id="link" type="url" required className="popup__input"
                       placeholder="Ссылка на картинку" onChange={handleChangeLink} value={link || ''} />
                <span className="popup__error" />
            </div>
        </PopupWithForm>
    );
}

export default AddPlacePopup
