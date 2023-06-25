import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
super({popupSelector});
this._previewImageElement = this._popupElement.querySelector(".modal__image");
this._previewImageCaption = this._popupElement.querySelector(".modal__preview-caption");
  }


open(data) {
  const previewPopupElement = this._popupElement.querySelector(".modal__image");
  const previewPopupCaption = this._popupElement.querySelector(".modal__preview-caption");

  previewPopupElement.src = data.src;
  previewPopupElement.alt = data.alt;
  previewPopupCaption.textContent = data.alt;

  super.open();
}
}