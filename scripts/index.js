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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Wrappers
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreviewModalCloseButton =
  imagePreviewModal.querySelector(".modal__close");
const addCardForm = document.querySelector("#add-card-form");

//buttons and other DOM nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

//Form data
const nameInput = document.querySelector(".modal__input_type_name");
const jobInput = document.querySelector(".modal__input_type_description");
const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardUrlInput = document.querySelector(".modal__input_type_url");

//Functions
function closeModal(modal) {
  modal.classList.remove("modal_open");
}
function openModal(modal) {
  modal.classList.add("modal_open");
}
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  addCardForm.reset();
  closeModal(addCardModal);
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const modalImage = document.querySelector(".modal__image");
  const modalImageTitle = document.querySelector(".modal__image-title");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalImageTitle.textContent = cardData.name;
    openModal(imagePreviewModal);
  });

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  return cardElement;
}

//Form listeners
profileEditButton.addEventListener("click", () => {
  openModal(editProfileModal);
  fillProfileForm();
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileModalCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);

//add new card
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

imagePreviewModalCloseButton.addEventListener("click", () =>
  closeModal(imagePreviewModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
