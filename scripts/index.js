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
const profileTitleInput = document.querySelector("#profile-title-input");
const profileTitleName = document.querySelector("#profile-title-name");
const profileDescriptionInput = document.querySelector(
  "#profile-description-name"
);
const profileDescriptionName = document.querySelector("#card-description-input")
const profileEditForm = profileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const modalImagePreview = document.querySelector("#modal-preview-image");
const modalImage = modalImagePreview.querySelector(".modal__image");
const modalCaption = modalImagePreview.querySelector(".modal__preview-caption");
const previewExitButton = modalImagePreview.querySelector(".modal__close");
let card = document.querySelector("#add-card-form");
  card.reset();
// Functions

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
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
  const likeButtons = document.querySelectorAll(".card__button");

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {});
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
  //previewExitButton.addEventListener("click", () => {
   // closeModal(modalImagePreview);
 // });
  return cardElement;
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));


function renderCard(cardData, listel) {
  const cardElement = getCardElement(cardData);
  listel.prepend(cardElement);
}

// Event handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;

  renderCard({ name, link }, cardListEl);

  closeModal(addCardModal);
  
}
function openModal(modal) {
  modal.classList.add("modal_opened");
 
}

// Event listeners



profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

previewExitButton.addEventListener("click", () => {
    closeModal(modalImagePreview);
 });

// add new card

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

profileButtonEdit.addEventListener("click", () => {
  profileTitleName.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(profileModal);
});
