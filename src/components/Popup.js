export default class Popup {
constructor({popupSelector}) {
this._popupElement = document.querySelector(popupSelector);

}


open() {
// opens popup 
this._popupElement.classList.add('modal_opened');
this._setEventListeners();
}

close() {
// closes popup
this._popupElement.classList.remove('modal_opened');
this._popupElement.removeEventListeners('click', this._closeModalWithClick)
document.removeEventListener("keydown", this._handleEscClose);
}

_closeModalWithClick = (evt) => {
if (
  evt.target.classList.contains("modal__close") || 
  evt.target.classList.contains("modal__close-button")
)
{
  this.close();
}
};


_handleEscClose(evt) {
// listens for esc button
if (evt.key === "Escape") {
  this._close();
}
}
setEventListeners() {
// sets event listeners 
document.addEventListener("keydown", this._handleEscClose);
this._popupElement.addEventListener("click", this._closeModalWithClick);
}

}