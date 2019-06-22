'use strict';

(function () {

  var USER_PIN_OFFSET = {
    x: 31,
    y: 84
  };

  var map = document.querySelector('.map');
  var PINS = map.querySelector('.map__pins');
  var FRAGMENT = document.createDocumentFragment();
  var userPin = map.querySelector('.map__pin--main');
  var filtersForm = document.querySelector('.map__filters');
  var mapFilters = filtersForm.querySelectorAll('.map__filter');
  var form = document.querySelector('.ad-form');
  var inputAddress = form.querySelector('#address');
  var adFormElements = form.querySelectorAll('.ad-form__element');


  var showPins = function () {
    for (var i = 0; i < window.pin.advertisements.length; i++) {
      FRAGMENT.appendChild(window.pin.createPin(window.pin.advertisements[i]));
    }

    PINS.appendChild(FRAGMENT);
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

  var userPinfirstMousedownHandler = function () {

    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    showPins();
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
    form: form
  };
})();
