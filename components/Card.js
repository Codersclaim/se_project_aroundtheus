import { openModal } from "../utils/utils.js"

export default class Card {
  constructor({name, link}, cardSelector) {
this._name = name;
this._link = link;
this._cardSelector = cardSelector;
  }

_getTemplate() {
  return document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
}
_setEventListeners() {
   
  this._cardElement.querySelector(".card__button").addEventListener("click", () => {
this._likeButton();
   })

   this._cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
this._cardDeleteButton();
  })
}

_cardDeleteButton() {
  this._cardElement.remove();
  this._cardElement = null;
}


_likeButton() {
  this._cardElement.querySelector(".card__button").classList.toggle("card__like-button_active");
}



getCard() {
  this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
  this._cardElement = this._getTemplate();
  this._cardTitleEl = this._cardElement.querySelector(".card__title");
  this._cardImageEl = this._cardElement.querySelector(".card__image");

  this._cardTitleEl.textContent = this._name
  
  this._cardImageEl.src = this._link;
  this._cardImageEl.alt = this._name;

  this._setEventListeners();

  return this._cardElement;
}
}