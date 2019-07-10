'use strict';

(function () {

  var USER_PIN_OFFSET = {
    x: 31,
    y: 84
  };

  var DISPLAY_PINS_LIMIT = 5;

  var map = document.querySelector('.map');
  var pins = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var userPin = map.querySelector('.map__pin--main');
  var filtersForm = document.querySelector('.map__filters');
  var mapFilters = filtersForm.querySelectorAll('.map__filter');
  var form = document.querySelector('.ad-form');
  var inputAddress = form.querySelector('#address');
  var adFormElements = form.querySelectorAll('.ad-form__element');
  var shownPins;
  var advertisements;
  var currentCard;
  var cards;

  var onSuccess = function (data) {

    advertisements = data;
  };

  window.download(onSuccess);

  var removeShownPins = function () {

    shownPins.forEach(function (pin) {

      pin.remove();
    });
  };

  var removeCurrentCard = function () {

    if (currentCard) {

      currentCard.parentNode.removeChild(currentCard);
      currentCard = null;
    }
  };

  var housingTypeSelectChangeHandler = function () {

    var filtered = window.filtration.filterHousingType(advertisements);

    removeCurrentCard();
    removeShownPins();
    showPins(window.util.getLimitedSizeArray(filtered, DISPLAY_PINS_LIMIT));
  };

  window.filtration.housingTypeSelect.addEventListener('change', housingTypeSelectChangeHandler);

  var createCards = function (data) {

    var cardsArray = [];

    data.forEach(function (item) {

      cardsArray.push(window.card.createCard(item));
    });

    return cardsArray;
  };

  var showPins = function (data) {

    data.forEach(function (item) {

      fragment.appendChild(window.pin.createPin(item));
    });
    shownPins = Array.from(fragment.children);
    pins.appendChild(fragment);
    cards = createCards(data);
  };

  var toggleElementsListState = function (elementsList) {

    for (var i = 0; i < elementsList.length; i++) {
      elementsList[i].disabled = !elementsList[i].disabled;
    }
  };

  var toggleFormElementsState = function () {

    toggleElementsListState(mapFilters);
    toggleElementsListState(adFormElements);
    toggleElementsListState(filtersForm.children);
  };

  toggleFormElementsState();

  var MAP_WIDTH = 1200;
  var USER_PIN_WIDTH = 62;
  var locationBorderX = {
    min: 0,
    max: MAP_WIDTH - USER_PIN_WIDTH
  };

  var locationBorderY = {
    min: 130,
    max: 630
  };

  var calcLocationBorder = function (x, y) {

    if (y < locationBorderY.min) {

      userPin.style.top = locationBorderY.min + 'px';
    } else if (y > locationBorderY.max) {

      userPin.style.top = locationBorderY.max + 'px';
    } else if (x < locationBorderX.min) {

      userPin.style.left = locationBorderX.min + 'px';
    } else if (x > locationBorderX.max) {

      userPin.style.left = locationBorderX.max + 'px';
    }
  };

  var buttonCloseClickHandler = function () {

    removeCurrentCard();
  };

  var pinsClickHandler = function (evt) {

    var target = evt.target;
    var index = shownPins.indexOf(target);

    if (currentCard !== cards[index] && index !== -1) {

      removeCurrentCard();
      currentCard = cards[index];
      pins.appendChild(currentCard);
      var buttonClose = currentCard.querySelector('.popup__close');
      buttonClose.addEventListener('click', buttonCloseClickHandler);
      document.addEventListener('keydown', function (e) {

        if (e.keyCode === 27) {

          removeCurrentCard();
        }
      });
    }
  };

  pins.addEventListener('click', pinsClickHandler);


  var userPinfirstMousedownHandler = function () {

    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    showPins(window.util.getLimitedSizeArray(advertisements, DISPLAY_PINS_LIMIT));
    pins.addEventListener('click', pinsClickHandler);
    toggleFormElementsState();

    userPin.removeEventListener('mousedown', userPinfirstMousedownHandler);
  };

  userPin.addEventListener('mousedown', userPinfirstMousedownHandler);

  var userPinMouseDownHandler = function (evt) {
    evt.preventDefault();


    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userPin.style.top = (userPin.offsetTop - shift.y) + 'px';
      userPin.style.left = (userPin.offsetLeft - shift.x) + 'px';
      calcLocationBorder(userPin.offsetLeft - shift.x, userPin.offsetTop - shift.y);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      inputAddress.value = getUserPinLocation();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    var getUserPinLocation = function () {

      return parseInt(userPin.style.left, 10) + USER_PIN_OFFSET.x + ', ' + (parseInt(userPin.style.top, 10) + USER_PIN_OFFSET.y);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  userPin.addEventListener('mousedown', userPinMouseDownHandler);

  window.map = {
    form: form,
    advertisements: advertisements
  };
})();
