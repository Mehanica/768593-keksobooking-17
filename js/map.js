'use strict';

(function () {
  var DISPLAY_PINS_LIMIT = 5;
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

  var mapPins = window.form.cityMap.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var advertisements = [];

  var activatePage = function () {
    window.form.cityMap.classList.remove('map--faded');
    window.imagesUpload.adForm.classList.remove('ad-form--disabled');
    window.imagesUpload.enablePicturesDropZones();
    showPins(advertisements.slice(0, DISPLAY_PINS_LIMIT));
    window.form.toggleFormElementsState();
    window.pin.mainLocation.removeEventListener('mousedown', mainLocationFirstMousedownHandler);
    document.addEventListener('keydown', onEscKeyDown);
  };

  var successHandler = function (data) {
    advertisements = data.slice();
    activatePage();
  };

  var removePins = function () {
    var pins = window.form.cityMap.querySelectorAll('.map__pin:not(.map__pin--main)');

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
      window.pin.mainLocation.style.top = locationBorderY.min + 'px';

    } else if (y > locationBorderY.max) {
      window.pin.mainLocation.style.top = locationBorderY.max + 'px';

    } else if (x < locationBorderX.min) {

      window.pin.mainLocation.style.left = locationBorderX.min + 'px';
    } else if (x > locationBorderX.max) {

      window.pin.mainLocation.style.left = locationBorderX.max + 'px';
    }
  };

  var onEscKeyDown = function () {
    window.card.remove();
  };

  var mainLocationFirstMousedownHandler = function () {
    if (advertisements.length === 0) {
      window.data.download(successHandler);
    } else {
      activatePage();
    }
  };

  window.pin.mainLocation.addEventListener('mousedown', mainLocationFirstMousedownHandler);

  var mainLocationMouseDownHandler = function (evt) {
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

      window.pin.mainLocation.style.top = (window.pin.mainLocation.offsetTop - shift.y) + 'px';
      window.pin.mainLocation.style.left = (window.pin.mainLocation.offsetLeft - shift.x) + 'px';
      calcLocationBorder(window.pin.mainLocation.offsetLeft - shift.x, window.pin.mainLocation.offsetTop - shift.y);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      window.form.inputAddress.value = window.pin.getUserLocation();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.pin.mainLocation.addEventListener('mousedown', mainLocationMouseDownHandler);

  window.map = {
    DISPLAY_PINS_LIMIT: DISPLAY_PINS_LIMIT,
    advertisements: advertisements,
    mainLocationFirstMousedownHandler: mainLocationFirstMousedownHandler,
    render: showPins,
    remove: removePins,
    data: function () {
      return advertisements;
    }
  };
})();
