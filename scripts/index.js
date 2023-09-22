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

// Elements
const modals = [...document.querySelectorAll(".modal")];
const modalAddSubmitButton = document.querySelector("#modal-submit-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileAddModal = document.querySelector("#add-card-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileAddCloseButton = profileAddModal.querySelector(".modal__close");
const previewImageModal = document.querySelector("#image-preview-modal");
const previewImageCloseModal =
  previewImageModal.querySelector("#image-close-modal");
const previewImageCard = document.querySelector(".modal__preview-image");
const previewImageDescription = document.querySelector(".modal__image-title");
const profileTitle = document.querySelector(".profile__title");
const profileDesciption = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const profileAddForm = profileAddModal.querySelector(".modal__form");
const addCardModalTitleInput = document.querySelector("#picture-title-input");
const addCardModalLinkInput = document.querySelector("#image-link-input");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileAddButton = document.querySelector("#profile-add-button");

function closePopup(popup) {
  popup.classList.remove("modal_open");
  document.removeEventListener("keydown", closeByEscape);
}

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", closeByEscape);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardDescriptionTextEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove("card__delete-button");
  });
  cardImageEl.addEventListener("click", () => {
    previewImageCard.src = cardData.link;
    previewImageCard.alt = cardData.alt;
    previewImageDescription.textContent = cardData.name;
    openModal(previewImageModal);
  });
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.alt;
  cardDescriptionTextEl.textContent = cardData.name;

  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDesciption.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: addCardModalTitleInput.value,
    link: addCardModalLinkInput.value,
  };
  const card = getCardElement(cardData);
  cardListEl.prepend(card);
  closePopup(profileAddModal);
  profileAddForm.reset();
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_open");
    closePopup(openedPopup);
  }
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDesciption.textContent;
  openModal(profileEditModal);
});

profileAddButton.addEventListener("click", () => {
  toggleButtonState(
    [addCardModalTitleInput, addCardModalLinkInput],
    modalAddSubmitButton,
    config
  );
  openModal(profileAddModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddForm.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

modals.forEach((modalContainer) => {
  modalContainer.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_open")) {
      closePopup(modalContainer);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(modalContainer);
    }
  });
});
