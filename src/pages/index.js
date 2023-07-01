import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  profileButtonEdit,
  addCardModal,
  addNewCardButton,
  profileModal,
  profileModalCloseButton,
  addCardModalCloseButton,
  profileTitle,
  profileDescription,
  modalTitleName,
  profileTitleName,
  profileDescriptionInput,
  profileDescriptionName,
  profileEditForm,
  addCardFormElement,
  cardListEl,
  cardTemplate,
  cardTitleInput,
  cardUrlInput,
  cardSubmitButton,
  modalImagePreview,
  modalImage,
  modalCaption,
  previewExitButton,
  settings,
} from "../utils/constants.js";

// PopupWithImage

const popupImage = new PopupWithImage(
  "#modal-preview-image",
  handlePreviewImage
);
popupImage.setEventListeners();

// Functions

function renderCard(cardData, cardListEl) {
  const card = new Card(cardData, "#card-template", handlePreviewImage);
  return card.getCard();
}

function handlePreviewImage({ name, link }) {
  popupImage.open({ name, link });
}

// Event handlers

const editPopup = new PopupWithForm("#profile-edit-modal", (inputValues) => {
  userInfo.setUserInfo(inputValues);
  // profileTitle.textContent = profileTitleName.value;

  editPopup.close();
});

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;

  const newCard = renderCard({ name, link });
  cardSection.addItem(newCard);
  newCardPopup.close();

  addFormValidator.toggleButtonState();
}

// Validators

const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(settings, addCardFormElement);
addFormValidator.enableValidation();

// new card validator
addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  newCardPopup.open();
});

profileButtonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  
  profileTitleName.value = userData.username;
  profileDescriptionInput.value = userData.userJobDescription;
  
  editPopup.open();
  editFormValidator.resetValidation();
});

// new card

const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

newCardPopup.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__description",
});
//edit profile

editPopup.setEventListeners();

//Section

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const newCard = renderCard(data);
      cardSection.addItem(newCard);
    },
  },
  cardListEl
);

cardSection.renderItems();
