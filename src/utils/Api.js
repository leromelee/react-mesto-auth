class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkRequest(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {authorization: `${this._headers}`}
        })
            .then(res => this._checkRequest(res));
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {authorization: `${this._headers}`}
        })
            .then(res => this._checkRequest(res));
    }

    addCard(name, link) {
        return fetch(`${this._url}/cards`,
            {method: 'POST',
                headers: {authorization: `${this._headers}`, 'Content-Type': 'application/json'},
                body: JSON.stringify({name: name, link: link})
            })
            .then(res => this._checkRequest(res));
    }

    addLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`,
            {method: 'PUT',
                headers: {authorization: `${this._headers}`, 'Content-Type': 'application/json'
                }
            })
            .then(res => this._checkRequest(res));
    }

    updateUser(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {authorization: `${this._headers}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({name: name, about: about})
        })
            .then(res => this._checkRequest(res));
    }

    updateAvatar(avatarUrl) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {authorization: `${this._headers}`, 'Content-Type': 'application/json'},
            body: JSON.stringify({avatar: avatarUrl})
        })
            .then(res => this._checkRequest(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`,
            {method: 'DELETE',
            headers: {authorization: `${this._headers}`, 'Content-Type': 'application/json'}
        })
            .then(res => this._checkRequest(res));
    }

    removeLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {authorization: `${this._headers}`, 'Content-Type': 'application/json'}
        })
            .then(res => this._checkRequest(res));
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: 'e343e8e1-608e-40c1-bda2-485b4f9fb449'
});

export default api;

