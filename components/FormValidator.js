export default class FormValidator {
  constructor(settings, formEl) {
    this._formEl = formEl;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButton = settings._submitButtonSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._errorClass = settings._errorClass;
    this._formEl.querySelector(this._submitButtonSelector);
    
  }

  _showinputError(inputEl, errorMessage) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = errorMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.classList.remove(this._errorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput() {
    return !this._inputEls.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }
 
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      
      this._disabledButton(); 
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }
  disableButton() {
    const button = this._formEl.querySelector(this._submitButtonSelector);
    this._submitButtonSelector.disabled = true;
    button.classList.add(this._inactiveButtonClass);
  }

  _setEventListeners() {
    this._inputEls = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    
    this._submitButton = this._formEl.querySelector(
      this._submitButtonSelector
    );
    
    this._inputEls.forEach((inputEl) => {
      

      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}
