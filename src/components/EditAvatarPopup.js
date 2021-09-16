import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    React.useEffect(() => {avatarRef.current.value = '';}, [isOpen])

    const avatarRef = React.useRef (null);

    function handleSubmit (e) {
        e.preventDefault ();
        onUpdateAvatar ({avatar: avatarRef.current.value});
    }


    return (
        <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить"
                        onSubmit={handleSubmit}  isOpen={isOpen} onClose={onClose}>
            <div className="popup__input-container">
                <input name="avatarLink" id="avatar-link" type="url" required
                       className="popup__input" placeholder="Ссылка на картинку" ref={avatarRef}
                />
                <span className="popup__error" />
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup
