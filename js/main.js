'use strict';

var ADVERTISEMENTS_QUANTITY = 8;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_OFFSET = {
  x: 25,
  y: 70
};

var MapLimitY = {
  min: 130,
  max: 630
};

var map = document.querySelector('.map');

var TEMPLATE = document.querySelector('#pin').content.querySelector('button');

var PINS = map.querySelector('.map__pins');
var FRAGMENT = document.createDocumentFragment();


var getInteger = function (min, max) {

  return Math.round(min + Math.random() * (max + 1 - min));
};

var getOfferType = function () {
  return OFFER_TYPES[getInteger(0, OFFER_TYPES.length - 1)];
};

var createAdvertisements = function () {

  var advertisements = [];

  for (var i = 1; i <= ADVERTISEMENTS_QUANTITY; i++) {
    var card = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },

      'offer': {
        'type': getOfferType()
      },

      'location': {
        'x': getInteger(0, window.innerWidth),
        'y': getInteger(MapLimitY.min, MapLimitY.max)
      }
    };
    advertisements.push(card);
  }

  return advertisements;
};

map.classList.remove('map--faded');

var advertisements = createAdvertisements();

var createPin = function (advertisement) {

  var element = TEMPLATE.cloneNode(true);

  element.style.left = advertisement.location.x - PIN_OFFSET.x + 'px';
  element.style.top = advertisement.location.y - PIN_OFFSET.y + 'px';
  element.children[0].src = advertisement.author.avatar;
  element.children[0].alt = 'заголовок объявления';

  return element;
};

var showPins = function () {
  for (var i = 0; i < advertisements.length; i++) {
    FRAGMENT.appendChild(createPin(advertisements[i]));
  }

  PINS.appendChild(FRAGMENT);
};

showPins();
