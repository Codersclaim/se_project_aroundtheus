import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDeleteCard from "../components/PopupWithDeleteCard.js";
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
  submitButtonDelete,
} from "../utils/constants.js";
import Api from "../components/Api.js";

// Api Constant
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "5b7f0162-0de6-4ed6-bd4c-009b0dfc8ce3",
    "Content-Type": "application/json",
  },
});
let cardSection;
let userID;
// Setting User Information
Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userID = userData._id;
    userInfo.setUserInfo(userData);
    cardSection = new Section(
      {
        items: cardData,
        renderer: (data) => {
          const newCard = renderCard(data);
          cardSection.addItem(newCard);
        },
      },
      cardListEl
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

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

function handleProfileSubmit(data) {
  popupImage.renderingLoading(data);
  api;
  editProfileInformation(data)
    .then((newUserData) => {
      userInfo.setUserInfo(newUserData);
    })
    .then(() => {
      popupImage.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupImage.renderLoading(false);
    });
}

const editPopup = new PopupWithForm("#profile-edit-modal", handleProfileSubmit);
// (inputValues) =>
// userInfo.setUserInfo(inputValues);
// profileTitle.textContent = profileTitleName.value;

editPopup.close();

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
function handleNewCardSubmit(data) {
  popupImage.renderingLoading(data);
  api;
  editProfileInformation(data)
    .then((newUserData) => {
      userInfo.setUserInfo(newUserData);
    })
    .then(() => {
      popupImage.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupImage.renderLoading(false);
    });
}

const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  // handleAddCardFormSubmit
  handleNewCardSubmit
);

newCardPopup.setEventListeners();

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__description",
});
//edit profile

editPopup.setEventListeners();

// Delete Verify

const cardDeleteVerify = new PopupWithDeleteCard("#card-delete-modal", handleCardDelete)

function handleCardDelete() {
  cardDeleteVerify.setSubmitAction(() => {
    cardDeleteVerify.renderloading();
    api
    .deleteCardInformation(data._id)
    .then((res) => {
element.remove(res._id);
    })
    .then(() => {
      cardDeleteVerify.close();
    })
    .catch((err) => {
console.error(err);
    })
    .finally(()=> {
      cardDeleteVerify.renderloading(false);
    });
  });
  cardDeleteVerify.open(data._id);
}





