import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({onCardClick, onCardLike, onCardDelete, cards,
                  onEditProfile, onAddPlace, onEditAvatar}) {

    const currentUser = React.useContext (CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-overlay">
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"
                    />
                    <button type="button" className="profile__avatar-button" onClick={onEditAvatar}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}
                    />
                    <p className="profile__disc">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}
                />
            </section>
            <section className="cards">
                <ul className="card">
                    {cards.map (card => (
                        <Card onCardLike={onCardLike} onCardDelete={onCardDelete}
                              card={card} key={card._id} onCardClick={onCardClick}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
