import Card from "../componets/card.js";
import FormValidator from "../componets/FormValidator.js";
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
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

//do i need this?
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const modals = document.querySelectorAll(".modal");
//
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileAddModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#image-preview-modal");
const modalImageEl = document.querySelector(".modal__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector("#profile-form");
const profileAddForm = document.querySelector("#add-card-form");
const cardTitleInput = document.querySelector("#picture-title-input");
const CardModalLinkInput = document.querySelector("#image-link-input");
const cardListEl = document.querySelector(".cards__list");

const profileAddButton = document.querySelector("#profile-add-button");
const modalCaptionEl = document.querySelector(".modal__image-title");
//const profileCloseButton = document.querySelector("#profile-close-button");
//const addCardCloseButton = document.querySelector("#add-card-close-button");

const cardSelector = "#card-template";
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const cardFormValidator = new FormValidator(validationSettings, profileAddForm);
cardFormValidator.enableValidation();

//Functions
function openModal(modal) {
  document.removeEventListener("keydown", closeByEscape);
  modal.classList.add("modal_open");
}

function closePopup(modal) {
  document.removeEventListener("keydown", closeByEscape);
  modal.classList.remove("modal_open");
}

function closeAddCard() {
  closePopup(profileAddModal);
}

function closePreviewImage() {
  closePopup(previewImageModal);
}

function closeEditProfile() {
  closePopup(profileEditModal);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_open");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleImageClick() {
  modalImageEl.src = this._link;
  modalImageEl.alt = `Image${this._name}`;
  modalCaptionEl.textContent = this._name;
  openModal(previewImageModal);
}

function createCard(cardData) {
  const cardEl = new Card(cardData, cardSelector, handleImageClick);
  return cardEl.getView();
}

function renderCard(cardData, wrapper) {
  const card = createCard(cardData);
  wrapper.prepend(card);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editFormValidator.resetValidation();
  closePopup(profileEditModal);
}

function handleProfileAddSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = CardModalLinkInput.value;
  renderCard({ name, link }, cardListEl);
  evt.target.reset();
  closeAddCard();
  cardFormValidator.toggleButtonState();
}

//Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(profileAddModal);
});

///////////////////////////////////
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddForm.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_open")) {
      closePopup(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(modal);
    }
  });
});

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
