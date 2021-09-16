import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card({onCardClick, onCardDelete, onCardLike, card}) {
    const currentUser = React.useContext (CurrentUserContext);
    const isLiked = card.likes.some (item => item._id === currentUser._id);
    const isOwn = card.owner._id === currentUser._id;


    const cardDeleteButtonClassName = (
        `element__button-delete ${isOwn ? '' : 'element__button-delete-disabled'}`
    );
    const cardLikeButtonClassName = (
        `element__button ${isLiked ? 'element__button_active' : ''}`
    );

    function handleClick () {
        onCardClick (card);
    }
    function handleLike () {
        onCardLike (card, isLiked);
    }
    function handleDeleteClick () {
        onCardDelete (card);
    }

    return (
    <li className="element">
        <img src={card.link} alt={card.name} className='element__photo' onClick={handleClick} />
        <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
        <div className="element__info">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__button-group">
                <button className={cardLikeButtonClassName} onClick={handleLike} type="button"></button>
                <p className="element__like-counter">{card.likes.length}</p>
            </div>
        </div>
    </li>
    );
}

export default Card;
