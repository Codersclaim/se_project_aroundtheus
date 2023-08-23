import Popup from "./Popup.js";

export default class PopupWithDeleteCard extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    // this._submitForm
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleSubmit = this._handleSubmit.bind(this);
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._deleteCardButton = this._popupElement.querySelector(
      ".modal__delete-card-button"
    );
  }
  renderLoading(isLoading, loading = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loading;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit();
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    // this._deleteCardButton.addEventListener("submit", this._handleSubmit);
    this._popupForm.addEventListener("submit", this._handleSubmit);
  }
}
