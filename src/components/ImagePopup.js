function ImagePopup({onClose, card}) {
    return (
        <section
            className={`popup popup_type_closecard ${card.link ? 'popup_active' : ''}`}
        >
            <div className="popup__content-closecard">
                <img className="popup__photo" src={card.link} alt={card.name} />
                <button type="button" className="popup__button-close" aria-label="Закрыть попап" onClick={onClose} />
                <p className="popup__name">{card.name}</p>
            </div>
        </section>
    );
}

export default ImagePopup;
