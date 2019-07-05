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

    photosContainer.innerHTML = '';

    getFeatures(advertisement, featuresElements);
    renderPhoto(photos, photosContainer, photo);

    item.children[0].src = advertisement.author.avatar;
    item.children[2].innerHTML = advertisement.offer.title;
    item.children[3].innerHTML = advertisement.offer.address;
    item.children[4].innerHTML = advertisement.offer.price + '&#x20bd;/ночь';
    item.children[5].innerHTML = advertisement.offer.type;
    item.children[6].innerHTML = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    item.children[7].innerHTML = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    item.children[9].innerHTML = advertisement.offer.description;

    return item;
  };

  window.card = {

    createCard: createCard
  };

})();
