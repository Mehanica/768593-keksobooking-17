'use strict';

(function () {

  var PIN_OFFSET = {
    x: 25,
    y: 70
  };

  var USER_PIN_OFFSET = {
    x: 31,
    y: 84
  };

  var userPinStartCoordinates = {
    x: 570,
    y: 375
  };

  var TEMPLATE = document.querySelector('#pin').content.querySelector('button');
  var userPin = document.querySelector('.map__pin--main');

  var onPinClick = function (data) {
    window.card.create(data);
  };

  var createPin = function (advertisement) {
    var element = TEMPLATE.cloneNode(true);

    element.style.left = advertisement.location.x - PIN_OFFSET.x + 'px';
    element.style.top = advertisement.location.y - PIN_OFFSET.y + 'px';
    element.tabIndex = 0;
    element.children[0].src = advertisement.author.avatar;
    element.children[0].alt = advertisement.offer.title;
    element.children[0].style.pointerEvents = 'none';
    element.addEventListener('click', function () {
      onPinClick(advertisement);
    });

    return element;
  };

  var getUserPinLocation = function () {
    return parseInt(userPin.style.left, 10) + USER_PIN_OFFSET.x + ', ' + (parseInt(userPin.style.top, 10) + USER_PIN_OFFSET.y);
  };

  var resetUserPinStartCoordinates = function () {
    userPin.style.top = userPinStartCoordinates.y + 'px';
    userPin.style.left = userPinStartCoordinates.x + 'px';
  };


  window.pin = {
    userStartCoordinates: userPinStartCoordinates,
    getUserLocation: getUserPinLocation,
    mainLocation: userPin,
    create: createPin,
    resetUserStartCoordinates: resetUserPinStartCoordinates
  };
})();
