'use strict';

(function () {

  var USER_PIN_OFFSET = {
    x: 31,
    y: 84
  };

  var locationBorderX = {
    min: 0,
    max: MAP_WIDTH - USER_PIN_WIDTH
  };

  var locationBorderY = {
    min: 130,
    max: 630
  };

  var DISPLAY_PINS_LIMIT = 5;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var userPin = map.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');
  var advertisements = [];
  var MAP_WIDTH = 1200;
  var USER_PIN_WIDTH = 62;

  var onSuccess = function (data) {
    advertisements = data.slice();
  };

  window.download(onSuccess);

  var removePins = function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      mapPins.removeChild(pin);
    });
  };

  var showPins = function (data) {
    removePins();
    data.forEach(function (item) {
      fragment.appendChild(window.pin.create(item));
    });
    mapPins.appendChild(fragment);
  };

  window.form.toggleFormElementsState();

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

  var onEscKeyDown = function () {
    window.card.remove();
  };

  var userPinfirstMousedownHandler = function () {
    map.classList.remove('map--faded');
    window.form.formElement.classList.remove('ad-form--disabled');
    showPins(advertisements.slice(0, DISPLAY_PINS_LIMIT));
    window.form.toggleFormElementsState();
    userPin.removeEventListener('mousedown', userPinfirstMousedownHandler);
    document.addEventListener('keydown', onEscKeyDown);
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
    DISPLAY_PINS_LIMIT: DISPLAY_PINS_LIMIT,
    element: map,
    advertisements: advertisements,
    render: showPins,
    remove: removePins,
    data: function () {
      return advertisements;
    }
  };
})();
