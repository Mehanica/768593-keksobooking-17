'use strict';

(function () {

  var PIN_OFFSET = {
    x: 25,
    y: 70
  };

  var TEMPLATE = document.querySelector('#pin').content.querySelector('button');

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

  window.pin = {
    create: createPin
  };
})();
