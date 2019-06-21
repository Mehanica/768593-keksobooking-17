'use strict';

(function () {

  var ADVERTISEMENTS_QUANTITY = 8;
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var MapLimitY = {
    min: 130,
    max: 630
  };

  var getOfferType = function () {
    return OFFER_TYPES[window.util.getInteger(0, OFFER_TYPES.length - 1)];
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
          'x': window.util.getInteger(0, window.innerWidth),
          'y': window.util.getInteger(MapLimitY.min, MapLimitY.max)
        }
      };
      advertisements.push(card);
    }

    return advertisements;
  };

  window.card = {
    createAdvertisements: createAdvertisements
  };
})();
