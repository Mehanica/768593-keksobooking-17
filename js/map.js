'use strict';

(function () {

  var locationBorderX = {
    min: 0,
    max: MAP_WIDTH - USER_PIN_WIDTH
  };

  var locationBorderY = {
    min: 130,
    max: 630
  };

  var DISPLAY_PINS_LIMIT = 5;
  var mapPins = window.form.mapElement.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var advertisements = [];
  var MAP_WIDTH = 1200;
  var USER_PIN_WIDTH = 62;

  var activatePage = function () {
    window.form.mapElement.classList.remove('map--faded');
    window.form.formElement.classList.remove('ad-form--disabled');
    showPins(advertisements.slice(0, DISPLAY_PINS_LIMIT));
    window.form.toggleFormElementsState();
    window.pin.userPin.removeEventListener('mousedown', userPinfirstMousedownHandler);
    document.addEventListener('keydown', onEscKeyDown);
  };

  var onSuccess = function (data) {
    advertisements = data.slice();
    activatePage();
  };

  var removePins = function () {
    var pins = window.form.mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');

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
      window.pin.userPin.style.top = locationBorderY.min + 'px';

    } else if (y > locationBorderY.max) {
      window.pin.userPin.style.top = locationBorderY.max + 'px';

    } else if (x < locationBorderX.min) {

      window.pin.userPin.style.left = locationBorderX.min + 'px';
    } else if (x > locationBorderX.max) {

      window.pin.userPin.style.left = locationBorderX.max + 'px';
    }
  };

  var onEscKeyDown = function () {
    window.card.remove();
  };

  var userPinfirstMousedownHandler = function () {
    if (advertisements.length === 0) {
      window.download(onSuccess);
    } else {
      activatePage();
    }
  };

  window.pin.userPin.addEventListener('mousedown', userPinfirstMousedownHandler);

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

      window.pin.userPin.style.top = (window.pin.userPin.offsetTop - shift.y) + 'px';
      window.pin.userPin.style.left = (window.pin.userPin.offsetLeft - shift.x) + 'px';
      calcLocationBorder(window.pin.userPin.offsetLeft - shift.x, window.pin.userPin.offsetTop - shift.y);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      window.form.inputAddress.value = window.pin.getUserPinLocation();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.pin.userPin.addEventListener('mousedown', userPinMouseDownHandler);

  window.map = {
    DISPLAY_PINS_LIMIT: DISPLAY_PINS_LIMIT,
    advertisements: advertisements,
    userPinfirstMousedownHandler: userPinfirstMousedownHandler,
    render: showPins,
    remove: removePins,
    data: function () {
      return advertisements;
    }
  };
})();
