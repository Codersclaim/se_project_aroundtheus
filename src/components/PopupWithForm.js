import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
constructor(PopupSelector, handleFormSubmit) {

super({PopupSelector});
this._popupForm = this._popupElement.querySelector('.modal__form'); 
  this._handleFormSubmit = handleFormSubmit;
  this._modalInputs = this._popupForm.querySelectorAll(".modal__input");
}

close() {
this._popupForm.reset();
this._popupElement.removeEventListener("submit", this._handleFormSubmit);
super.close();
}

_getInputValues() {
const inputObject = {};
this._modalInputs.forEach((input) => {
  inputObject[input.name] = input.value; 
});

// this._inputList = document.querySelectorAll(".modal__input");
// this._inputList.forEach((input)=> {
//   if (input.type !== "") {
//     inputObject[input.name] = input.value; 
//   }
// });
return inputObject;
}

_submitForm() {
  const inputValues = this._getInputValues();
  this._handleFormSubmit(inputValues());
};


setEventListeners() {
  super.setEventListeners();
  this._popupElement.addEventListener("submit", this._submitForm);
}

}



