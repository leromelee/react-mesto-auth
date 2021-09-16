function PopupWithForm({name, title, children, buttonText, isOpen, onClose, onSubmit}) {
    return (
        <section
            className={`popup popup_type_${name} ${isOpen ? 'popup_active' : ''}`}
        >
            <div className="popup__content">
                <h3 className="popup__title">{title}</h3>
                {children}
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    <button type="submit" className="popup__save">{buttonText}</button>
                </form>
                <button className="popup__button-close" type="button" onClick={onClose}></button>
            </div>
        </section>

    );
}

export default PopupWithForm;
