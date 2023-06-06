import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";
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

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Elements
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

// Functions

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closePopupWithEscapeKeydown);
// }
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = "Photo of" + cardTitleEl.textContent;
  cardTitleEl.textContent = cardData.name;
  const likeButton = cardElement.querySelector(".card__button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    openModal(modalImagePreview);
    modalImage.src = cardImageEl.src;
    modalImage.alt = cardImageEl.alt;
    modalCaption.textContent = cardTitleEl.textContent;
  });
  //   previewExitButton.addEventListener("click", () => {
  //    closeModal(modalImagePreview);
  //  });
  return cardElement;
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

function renderCard(cardData, listEl) {
  const card = new Card(cardData, "#card-template", openModal);
  listEl.prepend(card.getCard());
}

const imagePopup = document.querySelector("#modal-preview-image");
// imagePopup.open(data);
//
// Event handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleName.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardInputList = Array.from(
    addCardFormElement.querySelectorAll(settings.inputSelector)
  );
  renderCard({ name, link }, cardListEl);

  closeModal(addCardModal);
  addCardFormElement.reset();
  addFormValidator.toggleButtonState();
}

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//  document.addEventListener("keydown", closePopupWithEscapeKeydown);
// }

// Event listeners

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

previewExitButton.addEventListener("click", () => {
  closeModal(modalImagePreview);
});

// Validators

const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(settings, addCardFormElement);
addFormValidator.enableValidation();

// profileEditForm.addEventListener("click", () => {
//   modalTitleName.reset();
//   editFormValidator.resetValidation();
// });

// addCardFormElement.addEventListener("click", () => {
//   profileDescriptionName.reset();
//   addFormValidator.resetValidation();
// });

// add new card

// addNewCardButton.addEventListener("click", () => openModal(addCardModal));
// addCardModalCloseButton.addEventListener("click", () => {
//   closeModal(addCardModal);
//   addFormValidator.resetValidation();
// });


addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  openModal(addCardModal)
  
});
addCardModalCloseButton.addEventListener("click", () => {
     
     addFormValidator.resetValidation();
     closeModal(addCardModal);
});


profileButtonEdit.addEventListener("click", () => {
  profileTitleName.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(profileModal);
  editFormValidator.resetValidation();
});

function closePopupWithEscapeKeydown(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
   
    editFormValidator.resetValidation();
  }
}

modalImagePreview.addEventListener("mousedown", closeModalOnRemoteClick);
profileModal.addEventListener("mousedown", closeModalOnRemoteClick);
addCardModal.addEventListener("mousedown", closeModalOnRemoteClick);
