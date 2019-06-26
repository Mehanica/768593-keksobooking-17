'use strict';

(function () {

  var PIN_OFFSET = {
    x: 25,
    y: 70
  };

  var TEMPLATE = document.querySelector('#pin').content.querySelector('button');

  var advertisements = window.card.createAdvertisements();

  var successHandler = function (data) {

    console.log(data);
  };

  window.download(successHandler);

  var createPin = function (advertisement) {

    var element = TEMPLATE.cloneNode(true);

    element.style.left = advertisement.location.x - PIN_OFFSET.x + 'px';
    element.style.top = advertisement.location.y - PIN_OFFSET.y + 'px';
    element.children[0].src = advertisement.author.avatar;
    element.children[0].alt = 'заголовок объявления';

    return element;
  };

  window.pin = {
    advertisements: advertisements,

    createPin: createPin
  };
})();
