import done from '../images/done.svg'
import fail from '../images/fail.svg'

function InfoTooltip({ isOpen, onClose, error }) {
    return (
        <section
            className={`popup popup_info-tooltip ${isOpen ? "popup_active" : ""}`}
        >
            <div className="popup__content popup__content_auth">
                <img className="popup__auth-icon" src={error ? fail : done} alt="изображение"/>
                <p className="popup__title_auth">{error ? "Что-то пошло не так!" : "Вы успешно зарегистрировались!"}</p>
                <button className="popup__button-close" type="button"
                    aria-label="Закрыть окно" onClick={onClose}>
                </button>
            </div>
        </section>
    );
}

export default InfoTooltip;