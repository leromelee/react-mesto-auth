import React from 'react';
import { Switch, Route, Redirect, withRouter, useHistory } from 'react-router-dom';
import api from '../utils/Api.js';
import * as auth from '../utils/auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import PopupWithConfirm from './PopupWithConfirm.js';
import Login from './Login.js';
import Registration from './Registration.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';

function App () {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cardIdToDelete, setCardIdToDelete] = React.useState(null);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
    const [isInfoRegisterPopupOpen, setIsInfoRegisterPopupOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState(false);

    const history = useHistory();


    function closeAllPopups () {
        setSelectedCard({});
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setIsInfoRegisterPopupOpen(false);

    }


    function handleClick (card) {
        setSelectedCard(card);
    }
    function handleProfileClick () {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddCardClick () {
        setIsAddPlacePopupOpen(true);
    }
    function handleAvatarClick () {
        setIsEditAvatarPopupOpen(true);
    }


    React.useEffect(() => {
        checkToken();
    }, [])

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/');
        }
    }, [loggedIn])

    React.useEffect (() => {
        Promise.all([api.getUserInfo (), api.getInitialCards ()])
            .then(([userInfo, initialCards]) => {
                setCurrentUser(userInfo);
                setCards(initialCards);
            })
            .catch(err => console.log (err));
    }, []);

    React.useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', closeByEscape)

        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])




    function handleUpdateUser(currentUser) {

        api.updateUser(currentUser.name, currentUser.about)
            .then(res => {
                setCurrentUser (res);
                closeAllPopups ();
            })
            .catch(err => console.log (err))


    }
    function handleUpdateAvatar(currentUser) {

        api.updateAvatar(currentUser.avatar)
            .then (res => {
                setCurrentUser (res);
                closeAllPopups ();
            })
            .catch (err => console.log (err))

    }
    function handleCardLike(card, isLiked) {
        (isLiked ? api.removeLike(card._id) : api.addLike(card._id))
            .then(newCard => {
                setCards(cards =>
                    cards.map(item => (item._id === card._id ? newCard : item))
                );
            })
            .catch(err => console.log (err));
    }
    function handleCardDelete(card) {
        setIsConfirmPopupOpen(true)
        setCardIdToDelete(card);
    }
    function handleCardDeleteConfirm(card) {

        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter(item => item !== card)
                setCards(newCards)
                closeAllPopups()
            })
            .catch(err => console.log (err))

    }
    function handleAddPlaceSubmit(card) {

        api.addCard(card.name, card.link)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log (err))

    }


    function handleLogin ({ email, password }) {
        setUserEmail(email);
        auth.authorize(email, password)
            .then((res) => {
                const { token } = res;
                localStorage.setItem('jwt', token);
                setLoggedIn(true);
            })
            .catch(handleError)
    }
    function handleRegister ({ email, password }) {
        auth.register(email, password)
            .then((res) => {
                const { jwt, data } = res;
                const { email } = data;
                localStorage.setItem('jwt', jwt);
                setUserEmail(email);
                setLoggedIn(true);
                setErrorMessage(false);
                setIsInfoRegisterPopupOpen(true);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(true);
                setIsInfoRegisterPopupOpen(true);
            })
    }
    function handleLogout () {
        setUserEmail('');
        setLoggedIn(false);
        localStorage.removeItem('jwt');
    }
    function checkToken () {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt)
                .then(res => {
                    const { data } = res;
                    const { email } = data;
                    setUserEmail(email)
                    setLoggedIn(true);
                })
                .catch(handleError)
        }

    }
    function handleError (error) {
        console.log(error);
    }


    return (
        <div className="root">
            <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
            <Header email={userEmail} handleLogout={handleLogout}/>
            <Switch>
            <ProtectedRoute
                exact path="/" loggedIn={loggedIn}
                component={Main}
                onCardLike={handleCardLike} onCardDelete={handleCardDelete}
                onAddPlace={handleAddCardClick} onEditAvatar={handleAvatarClick} onEditProfile={handleProfileClick}
                onCardClick={handleClick} cards={cards}
            />
            <Route exat path="/sign-in">
                <Login handleLogin={handleLogin} />
            </Route>

            <Route path="/sign-up">
                <Registration handleRegister={handleRegister} />
            </Route>

            <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
            </Switch>
            <Footer />

            <EditAvatarPopup  onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}onUpdateAvatar={handleUpdateAvatar}

            />
            <EditProfilePopup  onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser}

            />
            <AddPlacePopup  onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit}

            />
            <PopupWithConfirm  onClose={closeAllPopups} isOpen={isConfirmPopupOpen}
                              onHandleCardDeleteConfirm={handleCardDeleteConfirm} cardId={cardIdToDelete}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}
            />

                <InfoTooltip
                    error={errorMessage} isOpen={isInfoRegisterPopupOpen} onClose={closeAllPopups}
                />
        </CurrentUserContext.Provider>

            </div>

        </div>

    );
}

export default withRouter(App);