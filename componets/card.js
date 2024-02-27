export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handlePreviewPicture();
    });
  }

  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handlePreviewPicture() {
    this._handleImageClick();
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = this._getElement();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
}
