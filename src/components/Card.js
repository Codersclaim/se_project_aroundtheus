export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardLikes = likes;
    this._userId = userId;
    this._cardId = _id;
    this._ownerId = owner._id;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
  }

  // Event Listeners
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        this._handleDeleteClick(this._cardId);
      });

    this._cardImageEl.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    const cardLikeButton = this._cardElement.querySelector(".card__button");

    cardLikeButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleLikeClick(this);
    });
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  updateLike(result) {
    this._cardLikes = result.likes;
    this.revealCardLikes();
  }

  cardLiked() {
    return this._cardLikes.some((likes) => {
      return likes._id === this._userId;
    });
  }

  revealCardLikes() {
    if (this._cardLikes.length > 0) {
      this._cardElement.querySelector(".card__like-change").textContent =
        this._cardLikes.length;
    } else {
      this._cardElement.querySelector(".card__like-change").textContent = "";
    }

    if (this.cardLiked()) {
      this._cardElement
        .querySelector(".card__button")
        .classList.add("card__like-button_active");
    } else {
      this._cardElement
        .querySelector(".card__button")
        .classList.remove("card__like-button_active");
    }
  }

  getCard() {
    this._cardElement = this._getTemplate();
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl = this._cardElement.querySelector(".card__image");

    this._cardTitleEl.textContent = this._name;

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this.revealCardLikes();
    this._setEventListeners();
    if (this._userId !== this._ownerId) {
      this._cardElement.querySelector(".card__delete-button").remove();
    }
    return this._cardElement;
  }
}
