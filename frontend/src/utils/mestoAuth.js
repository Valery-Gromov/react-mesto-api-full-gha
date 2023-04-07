export const BASE_URL = 'http://localhost:3000';

const getResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

export const register = (userEmail, userPassword) => {
    console.log('userEmail', userEmail, 'password', userPassword);

    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "password": userPassword,
            "email": userEmail
        })
    })
    .then(getResponse)
}

export const authorize = (userEmail, userPassword) => {
    console.log('userEmail', userEmail, 'password', userPassword);

    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "email": userEmail,
            "password": userPassword
        })
    })
    .then(getResponse)
}

export const getToken = (token) => {

    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            // "Authorization" : `Bearer ${localStorage.getItem('token')}`
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(getResponse)
}