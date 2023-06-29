import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// import { openModal, closeModal } from "../utils/utils.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileButtonEdit = document.querySelector("#profile-button-edit");
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__button-add");

const profileModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileModal.querySelector(
  "#profile-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#profile-close-button-card"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modalTitleName = document.querySelector("#modal-title-name");
const profileTitleName = document.querySelector("#profile-title-name");
const profileDescriptionInput = document.querySelector(
  "#profile-description-name"
);
const profileDescriptionName = document.querySelector(
  "#card-description-input"
);
const profileEditForm = profileModal.querySelector("#profile-form");
const addCardFormElement = addCardModal.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardFormElement.querySelector("#modal-title-name");
const cardUrlInput = addCardFormElement.querySelector(
  "#card-description-input"
);
const cardSubmitButton = addCardFormElement.querySelector(
  ".modal__button_disabled"
);
const modalImagePreview = document.querySelector("#modal-preview-image");
const modalImage = modalImagePreview.querySelector(".modal__image");
const modalCaption = modalImagePreview.querySelector(".modal__preview-caption");
const previewExitButton = modalImagePreview.querySelector(".modal__close");

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// PopupWithImage

const popupImage = new PopupWithImage(
  "#modal-preview-image",
  handlePreviewImage
);
popupImage.setEventListeners();

// Functions

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

function renderCard(cardData, cardListEl) {
  const card = new Card(cardData, "#card-template", handlePreviewImage);
  return card.getCard();
}

function handlePreviewImage({ name, link }) {
  popupImage.open({ name, link });
}

// Event handlers
function handleProfileEditSubmit(e) {
  
  userInfo.setUserInfo({
    title: profileTitleName.value,
    job: profileDescriptionInput.value,
  });
  // profileTitle.textContent = profileTitleName.value;
  // profileDescription.textContent = profileDescriptionInput.value;
  editPopup.close();
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;
  // const cardInputEl = Array.from(
  //   addCardFormElement.querySelectorAll(settings.inputSelector)
  // );

  const newCard = renderCard({ name, link });
  cardSection.addItem(newCard);
  newCardPopup.close();
  addCardFormElement.reset();
  addFormValidator.toggleButtonState();
}

// Event listeners

profileModalCloseButton.addEventListener("click", () => editPopup.close());

previewExitButton.addEventListener("click", () => {
  popupImage.close();
});

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
  profileTitleName.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  editPopup.open();
  editFormValidator.resetValidation();
});

// function closeModalOnRemoteClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closeModal(evt.target);

//     editFormValidator.resetValidation();
//   }
// }
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

const editPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

editPopup.close();

editPopup.setEventListeners();

// function openModal() {
// popupImage.open();
// }

// const imagePopup = document.querySelector("#modal-preview-image");
// imagePopup.open(data);
//
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

// userInfo

// modalImagePreview.addEventListener("mousedown", closeModalOnRemoteClick);
// profileModal.addEventListener("mousedown", closeModalOnRemoteClick);
// addCardModal.addEventListener("mousedown", closeModalOnRemoteClick);
