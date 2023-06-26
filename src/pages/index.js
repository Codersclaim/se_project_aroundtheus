import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal, initialCards } from "../utils/utils.js";
import '../pages/index.css';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";


// Functions


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
  
  return cardElement;
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

function renderCard(cardData, listEl) {
  const card = new Card(cardData, "#card-template", openModal);
  listEl.prepend(card.getCard());
}


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


// new card validator
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
// new card



const newCardPopup = new PopupWithForm('#add-card-modal', handleAddCardFormSubmit);
newCardPopup.close();
newCardPopup.setEventListeners();


//edit profile

const editPopup = new PopupWithForm("#profile-edit-modal", handleProfileEditSubmit)
userInfo.setUserInfo(handleProfileEditSubmit);  
editPopup.close();

editPopup.setEventListeners();

// PopupWithImage
      
const PopupImage = new PopupWithImage("#modal-preview-image", openModal);
PopupImage.setEventListeners();

// function openModal() {
PopupImage.open();
// }



const imagePopup = document.querySelector("#modal-preview-image");
// imagePopup.open(data);
//
//Section

const cardSection = new Section({items: initialCards, renderer: renderCard =>{
  const newCard = createCard(renderCard);
  cardSection.addItem(newCard);
},
},
  cardList
  );

  cardSection.renderItems();

// userInfo
const userInfo = new UserInfo({
  userNameSelector: "profile__title",
  userJobSelector: "profile__description",
});


modalImagePreview.addEventListener("mousedown", closeModalOnRemoteClick);
profileModal.addEventListener("mousedown", closeModalOnRemoteClick);
addCardModal.addEventListener("mousedown", closeModalOnRemoteClick);
