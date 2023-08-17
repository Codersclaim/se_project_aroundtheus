export default class Api {
  constructor({ baseUrl, headers }) {
    (this._baseUrl = baseUrl), (this._headers = headers);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInformation() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).finally(() => {
      console.log("Done with user info");
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((result) => {
        return result;
      })
      .finally(() => {
        console.log("Done with initial cards");
      });
  }
  // User Profile
  editProfileInformation({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((response) => {
        return response;
      })
      .finally(() => {
        console.log("Done sending User Information");
      });
  }
  // Avatar
  avatarInformation({avatar}) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  // Adds New Card and sends to the server
  addNewCardInformation({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((response) => {
        return response;
      })
      .finally(() => {
        console.log("Done adding New Card Information from Server");
      });
  }
  // Delete card
  deleteCardInformation(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .finally(() => {
        console.log("Done deleting card");
      });
  }
  // Add and Remove Like
  likesAddInformation(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }
  likesRemoveInformation(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
