class Api {
    constructor({ baseUrl }) {
      // тело конструктора
      this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(res.status)
    }
  
    getProfile() {
        const token = localStorage.getItem('token')
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        })
        .then(this._checkResponse)
        // .catch(console.log)
    }

    getInitialCards() {
        const token = localStorage.getItem('token')
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        })
        .then(this._checkResponse)
        // .catch(console.log)
    }

    editProfile(name, about) {
        const token = localStorage.getItem('token')
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name,
                about
              })
        })
        .then(this._checkResponse)
        // .catch(console.log)
    }

    addCard(name, link) {
        const token = localStorage.getItem('token')
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name,
                link
              })
        })
        .then(this._checkResponse)
        // .catch(console.log)
    }

    deleteCard(id) {
        const token = localStorage.getItem('token')
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        })
        .then(this._checkResponse)
        // .catch(console.log)
    }

    deleteLike(id) {
        const token = localStorage.getItem('token')
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        })
        .then(this._checkResponse)
        // .catch(console.log)
    }

    addLike(id) {
        const token = localStorage.getItem('token')
        return fetch(`${this._baseUrl}/cards/${id}/likes/`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        })
        .then(this._checkResponse)
        // .catch(console.log)
    }

    uploadAvatar(avatar) {
        const token = localStorage.getItem('token')
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                avatar
              })
        })
        .then(this._checkResponse)
        // .catch(console.log)
    }
  
  }

  
  
 export const api = new Api({
    baseUrl: 'https://api.valery-gromov.nomoredomains.monster',
  });