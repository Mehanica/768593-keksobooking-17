'use strict';

var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var pinOffset = {
  x: 25,
  y: 70
};

var getInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getOfferType = function () {
  return offerTypes[getInteger(0, 3)];
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
        'x': getInteger(0, window.innerWidth) - pinOffset.x,
        'y': getInteger(130, 630) - pinOffset.y
      }
    };
    advertisements.push(card);
  }

  return advertisements;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var createTemplate = function () {

  var pins = document.querySelector('.map__pins');

  var advertisements = createAdvertisements();

  var template = document
    .querySelector('#pin')
    .content
    .querySelector('button');

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertisements.length; i++) {
    var element = template.cloneNode(true);

    element.style.left = advertisements[i].location.x + 'px';
    element.style.top = advertisements[i].location.y + 'px';
    element.children[0].src = advertisements[i].author.avatar;
    element.children[0].alt = 'заголовок объявления';

    fragment.appendChild(element);
  }

  pins.appendChild(fragment);
};

createTemplate();
