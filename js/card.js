'use strict';

(function () {

  var SAMPLE = document.querySelector('#card').content.querySelector('.popup');
  var ROOM_NOUNS = ['комата', 'комнаты', 'комнат'];
  var GUEST_NOUNS = ['гостя', 'гостей'];
  var CONVENIENCES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var getFeatures = function (data, featuresElements) {

    CONVENIENCES.forEach(function (item, index) {

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

  var buttonCloseClickHandler = function () {
    window.card.remove();
  };

  var createCardClone = function (advertisement) {
    var item = SAMPLE.cloneNode(true);
    var features = item.querySelectorAll('.popup__feature');
    var photosContainer = item.querySelector('.popup__photos');
    var photos = advertisement.offer.photos;
    var photo = photosContainer.children[0];

    photosContainer.innerHTML = '';

    getFeatures(advertisement, features);
    if (features.length === 0) {
      var featuresList = SAMPLE.querySelector('.popup__features');

      featuresList.remove();
    }

    renderPhoto(photos, photosContainer, photo);
    if (photos.length === 0) {
      photosContainer.remove();
    }

    if (!advertisement.author.avatar) {
      item.querySelector('.popup__avatar').remove();
    } else {
      item.querySelector('.popup__avatar').src = advertisement.author.avatar;
    }

    if (!advertisement.offer.title) {
      item.querySelector('.popup__title').remove();
    } else {
      item.querySelector('.popup__title').textContent = advertisement.offer.title;
    }

    if (!advertisement.offer.address) {
      item.querySelector('.popup__text--address').remove();
    } else {
      item.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    }

    if (!advertisement.offer.price) {
      item.querySelector('.popup__text--price').remove();
    } else {
      item.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
    }

    if (!advertisement.offer.type) {
      item.querySelector('.popup__type').remove();
    } else {
      item.querySelector('.popup__type').textContent = advertisement.offer.type;
    }

    if (!advertisement.offer.rooms && advertisement.offer.guests) {
      item.querySelector('.popup__text--capacity').remove();
    } else {
      item.querySelector('.popup__text--capacity').textContent = window.util.getCorrectNominativeCase(advertisement.offer.rooms, ROOM_NOUNS) + ' для ' + window.util.getCorrectParentCase(advertisement.offer.guests, GUEST_NOUNS);
    }

    if (!advertisement.offer.checkin) {
      item.querySelector('.popup__text--time').remove();
    } else {
      item.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    }

    if (!advertisement.offer.description) {
      item.querySelector('.popup__description').remove();
    } else {
      item.querySelector('.popup__description').textContent = advertisement.offer.description;
    }

    item.querySelector('.popup__close').addEventListener('click', buttonCloseClickHandler);

    return item;
  };

  var removeCard = function () {
    var popup = window.form.cityMap.querySelector('.popup');

    if (popup) {
      window.form.cityMap.removeChild(popup);
    }
  };

  var createCard = function (data) {
    removeCard();
    window.form.cityMap.appendChild(createCardClone(data));
  };

  window.card = {
    create: createCard,
    remove: removeCard
  };

})();
