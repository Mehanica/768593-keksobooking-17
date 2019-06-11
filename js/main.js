'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_OFFSET = {
  x: 25,
  y: 70
};

var MINIMAL_LOCATION_Y_VALUE = 130;
var MAXIMAL_LOCATION_Y_VALUE = 630;

var PINS = document.querySelector('.map__pins');
var FRAGMENT = document.createDocumentFragment();

var getInteger = function (min, max) {

  return Math.round(min + Math.random() * (max + 1 - min));
};

var getOfferType = function () {
  return OFFER_TYPES[getInteger(0, OFFER_TYPES.length - 1)];
};

var createAdvertisements = function () {

  var advertisements = [];

  for (var i = 1; i <= 8; i++) {
    var card = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },

      'offer': {
        'type': getOfferType()
      },

      'location': {
        'x': getInteger(0, window.innerWidth),
        'y': getInteger(MINIMAL_LOCATION_Y_VALUE, MAXIMAL_LOCATION_Y_VALUE)
      }
    };
    advertisements.push(card);
  }

  return advertisements;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var createTemplate = function () {

  var advertisements = createAdvertisements();

  var template = document
    .querySelector('#pin')
    .content
    .querySelector('button');

  for (var i = 0; i < advertisements.length; i++) {
    var element = template.cloneNode(true);

    element.style.left = advertisements[i].location.x - PIN_OFFSET.x + 'px';
    element.style.top = advertisements[i].location.y - PIN_OFFSET.y + 'px';
    element.children[0].src = advertisements[i].author.avatar;
    element.children[0].alt = 'заголовок объявления';

    FRAGMENT.appendChild(element);
  }
};

var renderTemplate = function () {

  PINS.appendChild(FRAGMENT);
};
createTemplate();
renderTemplate();
