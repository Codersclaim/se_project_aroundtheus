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
  profileAvatarButton,
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
let userId;
// Setting User Information
Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatarInfo(userData.avatar);
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
// Render
function renderCard(cardData, cardListEl) {
  const card = new Card(
    cardData,
    "#card-template",
    handlePreviewImage,
    handleDeleteClick,
    handleLikeClick,
    userId
  );
  return card.getCard();
}

function handlePreviewImage({ name, link }) {
  popupImage.open({ name, link });
}

function handleProfileSubmit(data) {
  editPopup.renderLoading(data);
  api
    .editProfileInformation(data)
    .then(({ name, about }) => {
      userInfo.setUserInfo(name, about);
    })
    .then(() => {
      editPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editPopup.renderLoading(false);
    });
}

const editPopup = new PopupWithForm("#profile-edit-modal", handleProfileSubmit);

editPopup.close();

// Validators
// edit Validator
const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();

// Avatar Validator
const addFormValidator = new FormValidator(settings, addCardFormElement);
addFormValidator.enableValidation();
const avatarForm = document.querySelector("#add-avatar");
const avatarValidator = new FormValidator(settings, avatarForm);
avatarValidator.enableValidation();

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

// New card
function handleNewCardSubmit(data) {
  console.log(data);
  newCardPopup.renderLoading(data);
  api
    .addNewCardInformation(data)
    .then((data) => {
      const newCard = renderCard(data);
      cardSection.addItem(newCard);
    })
    .then(() => {
      newCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopup.renderLoading(false);
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
  userAvatarSelector: ".profile__image",
});
//edit profile

editPopup.setEventListeners();

// Delete Verify

const cardDeleteVerify = new PopupWithDeleteCard(
  "#card-delete-modal",
  handleDeleteClick
);

function handleDeleteClick(cardId) {
  console.log(cardId);
  cardDeleteVerify.setSubmitAction(() => {
    cardDeleteVerify.renderloading();
    api
      .deleteCardInformation()
      .then((res) => {
        card.remove(res._id);
      })
      .then(() => {
        cardDeleteVerify.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardDeleteVerify.renderloading(false);
      });
  });
  cardDeleteVerify.open();
}
// Likes
function handleLikeClick(card) {
  if (card.cardLiked()) {
    api
      .likesRemoveInformation(card._cardId)
      .then((res) => {
        card.updateLike(res);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likesAddInformation(card._cardId)
      .then((res) => {
        card.updateLike(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// Changing Avatar

function handleAvatarImage(data) {
  console.log(data);
  avatarFormPopup.renderLoading(data);
  api
    .avatarInformation(data)
    
    .then(({avatar}) => {
      // const newCard = renderCard(data);
      // cardSection.addItem(newCard);
      userInfo.setAvatarInfo(avatar);
      console.log(data);
    })
    .then(() => {
      avatarFormPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarFormPopup.renderLoading(false);
    });
}

const avatarFormPopup = new PopupWithForm(".avatar__modal", handleAvatarImage);

profileAvatarButton.addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarFormPopup.open();
});
avatarFormPopup.setEventListeners();
