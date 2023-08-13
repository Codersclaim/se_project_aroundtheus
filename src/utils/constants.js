export const initialCards = [
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

export const profileButtonEdit = document.querySelector("#profile-button-edit");
export const addCardModal = document.querySelector("#add-card-modal");
export const addNewCardButton = document.querySelector(".profile__button-add");
export const profileModal = document.querySelector("#profile-edit-modal");
export const profileModalCloseButton = profileModal.querySelector(
  "#profile-close-button"
);
export const addCardModalCloseButton = addCardModal.querySelector(
  "#profile-close-button-card"
);
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const modalTitleName = document.querySelector("#modal-title-name");
export const profileTitleName = document.querySelector("#profile-title-name");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-name"
);
export const profileDescriptionName = document.querySelector(
  "#card-description-input"
);
export const profileEditForm = profileModal.querySelector("#profile-form");
export const addCardFormElement = addCardModal.querySelector("#add-card-form");
export const cardListEl = document.querySelector(".cards__list");

export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardTitleInput =
  addCardFormElement.querySelector("#modal-title-name");
export const cardUrlInput = addCardFormElement.querySelector(
  "#card-description-input"
);
export const cardSubmitButton = addCardFormElement.querySelector(
  ".modal__button_disabled"
);
export const modalImagePreview = document.querySelector("#modal-preview-image");
export const modalImage = modalImagePreview.querySelector(".modal__image");
export const modalCaption = modalImagePreview.querySelector(
  ".modal__preview-caption"
);
export const previewExitButton =
  modalImagePreview.querySelector(".modal__close");

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const submitButtonDelete = document.querySelector(
  "modal__delete-card-button"
);
export const profileAvatarButton = document.querySelector("profile__avatar-select");