import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    const previewPopupElement =
      this._popupElement.querySelector(".modal__image");
    const previewPopupCaption = this._popupElement.querySelector(
      ".modal__preview-caption"
    );

    previewPopupElement.src = data.link;
    previewPopupElement.alt = data.name;
    previewPopupCaption.textContent = data.name;

    super.open();
  }
}
