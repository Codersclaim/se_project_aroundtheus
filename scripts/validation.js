function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
const errorMessageEl= formEl.querySelector(detail);
inputEl.classList.add(inputErrorClass);
errorMessageEl.textContent = inputEl.validationMessage;
errorMessageEl.classList.add(errorClass);
}
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  let detail = `#${inputEl.id}-error`;
  const errorMessageEl= formEl.querySelector(detail);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = '';
  errorMessageEl.classList.remove(errorClass);
  }
function checkInputValidity(formEl, inputEl, options) {
if (!inputEl.validity.valid) {
return showInputError(formEl, inputEl, options);
} 
  hideInputError(formEl, inputEl, options);

}
// submit button
function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}) {
let foundInvalid = false;
  inputEls.forEach(inputEl => {
if (!inputEl.validity.valid) {
  foundInvalid = true;
}
  });
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    return submitButton.disabled = true;
  } 
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    const submitButton = formEl.querySelector('.modal__button');
inputEl.addEventListener("input", (e) =>  {
checkInputValidity(formEl, inputEl, options);
toggleButtonState(inputEls, submitButton, options);
  });
});
}

function enableValidation(options) {
const formEls = [...document.querySelectorAll(options.formSelector)];
formEls.forEach((formEl) => {
 formEl.addEventListener("submit", (e) => {
e.preventDefault();
});

setEventListeners(formEl, options);
});
}
  
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

enableValidation(config); 