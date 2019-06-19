'use strict';

var ADVERTISEMENTS_QUANTITY = 8;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_OFFSET = {
  x: 25,
  y: 70
};

var USER_PIN_OFFSET = {
  x: 31,
  y: 84
};

var MapLimitY = {
  min: 130,
  max: 630
};

var map = document.querySelector('.map');
var TEMPLATE = document.querySelector('#pin').content.querySelector('button');
var PINS = map.querySelector('.map__pins');
var FRAGMENT = document.createDocumentFragment();
var userPin = map.querySelector('.map__pin--main');
var filtersForm = document.querySelector('.map__filters');
var mapFilters = filtersForm.querySelectorAll('.map__filter');
var form = document.querySelector('.ad-form');
var inputAddress = form.querySelector('#address');
var adFormElements = form.querySelectorAll('.ad-form__element');

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

var toggleElementsListState = function (elementsList) {

  for (var i = 0; i < elementsList.length; i++) {
    elementsList[i].disabled = !elementsList[i].disabled;
  }
};

var toggleFormElementsState = function () {

  toggleElementsListState(mapFilters);
  toggleElementsListState(adFormElements);
  toggleElementsListState(filtersForm.children);
};

toggleFormElementsState();

var firstUserPinClickHandler = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  showPins();
  toggleFormElementsState();
  userPin.removeEventListener('click', firstUserPinClickHandler);
};

userPin.addEventListener('click', firstUserPinClickHandler);

var getUserPinLocation = function () {

  return parseInt(userPin.style.left, 10) + USER_PIN_OFFSET.x + ', ' + (parseInt(userPin.style.top, 10) + USER_PIN_OFFSET.y);
};

var userPinMouseUpHandler = function () {

  inputAddress.value = getUserPinLocation();
};

userPin.addEventListener('mouseup', userPinMouseUpHandler);

var selectTypeOfHousing = form.querySelector('#type');
var priceField = form.querySelector('#price');

var optionChangeHandler = function () {

  if (selectTypeOfHousing.children[0].selected) {
    priceField.min = '0';
    priceField.placeholder = '0';
  } else if (selectTypeOfHousing.children[1].selected) {
    priceField.min = '1000';
    priceField.placeholder = '1000';
  } else if (selectTypeOfHousing.children[2].selected) {
    priceField.min = '5000';
    priceField.placeholder = '5000';
  } else if (selectTypeOfHousing.children[3].selected) {
    priceField.min = '10000';
    priceField.placeholder = '10000';
  }
};

selectTypeOfHousing.addEventListener('change', optionChangeHandler);

var selectTimein = form.querySelector('#timein');
var selectTimeout = form.querySelector('#timeout');

var selectTimeinChangeHandler = function () {

  if (selectTimein.children[0].selected) {
    selectTimeout.children[0].selected = true;
  } else if (selectTimein.children[1].selected) {
    selectTimeout.children[1].selected = true;
  } else if (selectTimein.children[2].selected) {
    selectTimeout.children[2].selected = true;
  }
};

selectTimein.addEventListener('change', selectTimeinChangeHandler);

var selectTimeoutChangeHandler = function () {

  if (selectTimeout.children[0].selected) {
    selectTimein.children[0].selected = true;
  } else if (selectTimeout.children[1].selected) {
    selectTimein.children[1].selected = true;
  } else if (selectTimeout.children[2].selected) {
    selectTimein.children[2].selected = true;
  }
};

selectTimeout.addEventListener('change', selectTimeoutChangeHandler);

var titleField = form.querySelector('#title');

var inputInvalidHadler = function (evt) {
  var target = evt.target;
  target.style.outline = '4px solid red';
};

titleField.addEventListener('invalid', function (evt) {

  inputInvalidHadler(evt);
});

priceField.addEventListener('invalid', function (evt) {

  inputInvalidHadler(evt);
});


// var main = document.querySelector('main');
// var successTemplate = main.querySelector('#success');

// var formValidHandler = function () {

//   var successPopup = successTemplate.cloneNode(true);
//   main.appendChild(successPopup);
// };

// form.addEventListener('valid', formValidHandler);

