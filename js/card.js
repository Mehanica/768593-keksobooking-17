'use strict';

(function () {

  var SAMPLE = document.querySelector('#card').content.querySelector('.popup');

  var getFeatures = function (data, featuresElements) {

    var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    FEATURES.forEach(function (item, index) {

      if (data.offer.features.indexOf(item) === -1) {

        featuresElements[index].parentNode.removeChild(featuresElements[index]);
      }
    });
  };

  var renderPhoto = function (data, container, photo) {

    data.forEach(function (item) {
      var photoCopy = photo.cloneNode(true);
      photoCopy.src = item;

      container.appendChild(photoCopy);
    });
  };

  var createCard = function (advertisement) {

    var item = SAMPLE.cloneNode(true);
    var featuresElements = item.querySelectorAll('.popup__feature');

    var photosContainer = item.querySelector('.popup__photos');
    var photos = advertisement.offer.photos;
    var photo = photosContainer.children[0];
    var ROOM_NOUNS = ['комата', 'комнаты', 'комнат'];
    var GUEST_NOUNS = ['гостя', 'гостей'];

    photosContainer.innerHTML = '';

    getFeatures(advertisement, featuresElements);
    renderPhoto(photos, photosContainer, photo);

    item.querySelector('.popup__avatar').src = advertisement.author.avatar;
    item.querySelector('.popup__title').textContent = advertisement.offer.title;
    item.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    item.querySelector('.popup__text--price').textContent = advertisement.offer.price + '&#x20bd;/ночь';
    item.querySelector('.popup__type').textContent = advertisement.offer.type;
    item.querySelector('.popup__text--capacity').textContent = window.util.getCorrectNominativeCase(advertisement.offer.rooms, ROOM_NOUNS) + ' для ' + window.util.getCorrectParentCase(advertisement.offer.guests, GUEST_NOUNS);
    item.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    item.querySelector('.popup__description').textContent = advertisement.offer.description;

    return item;
  };

  window.card = {

    createCard: createCard
  };

})();
