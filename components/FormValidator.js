export default class FormValidator {
  constructor (settings, formEl) {

  this.formEl = formEl;
  this._inputSelector = settings._inputSelector;
  this._submitButtonSelector = settings._submitButtonSelector;
  this._inactiveButtonClass = settings._inactiveButtonClass;
  this._inputErrorClass = settings._inputErrorClass;
  this._errorClass = settings._errorClass;

}

_showinputError(inputEl) {
this._element = this._formEl.querySelector(`#${inputEl.id}-error`);
inputEl.classList.add(this._inputErrorClass);
this._errorMessageEl.textContent = inputEl.validationMessage;
this._errorMessageEl.classList.add(this._errorClass);
}

_hideInputError(inputEl) {
  this._element = this._formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(this._inputErrorClass);
  errorMessageEl.classList.remove(this._errorClass);
  errorMessageEl.textContent = "";
 
  }
  


_checkInputValidity(inputEl) {
if (!inputEl.validity.valid) {
this._showinputError(inputEl);
} else {
this._hideInputError(inputEl);
}
}

_hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => { 
  return !inputEl.validity.valid; 
});
}

_toggleButtonState() {
  if (this._hasInvalidInput(this._inputEls)) {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
    
  } else {
  this._submitButton.classList.remove(this._inactiveButtonClass);
  this._submitButton.disabled = false;
  }
}



_setEventListeners() {
  this._inputList = Array.from(
  this._formEl.querySelectorAll(this._inputSelector)
  );
  this._inputEls.forEach((inputEl) => {
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    
    inputEl.addEventListener("input", (e) => {
      this._checkInputValidity();
      this._toggleButtonState();
    });
  });
}


  enableValidation() {
    
      this._formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });
  
      this._setEventListeners(formEl, options);
  
}

}

