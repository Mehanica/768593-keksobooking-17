'use strict';

(function () {

  var TYPE_PRICE = {
    'flat': '1000',
    'bungalo': '0',
    'house': '5000',
    'palace': '10000'
  };

  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var ESC_KEY_CODE = 27;

  var map = document.querySelector('.map');
  var filtersForm = map.querySelector('.map__filters');
  var mapFilters = filtersForm.querySelectorAll('.map__filter');
  var mapFilterFeatures = filtersForm.querySelector('.map__features');
  var adFormElements = window.imagesUpload.formElement.querySelectorAll('.ad-form__element');
  var selectTypeOfHousing = window.imagesUpload.formElement.querySelector('#type');
  var priceField = window.imagesUpload.formElement.querySelector('#price');
  var selectRoomNumber = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');
  var selectTimein = window.imagesUpload.formElement.querySelector('#timein');
  var selectTimeout = window.imagesUpload.formElement.querySelector('#timeout');
  var titleField = window.imagesUpload.formElement.querySelector('#title');
  var inputAddress = document.querySelector('#address');


  var toggleElementsListState = function (elementsList) {

    for (var i = 0; i < elementsList.length; i++) {
      elementsList[i].disabled = !elementsList[i].disabled;
    }
  };

  var toggleFormElementsState = function () {
    toggleElementsListState(mapFilters);
    toggleElementsListState(adFormElements);
    toggleElementsListState(mapFilterFeatures);
  };

  var selectTypeOfHousingChangeHandler = function () {
    var minPrice = TYPE_PRICE[selectTypeOfHousing.value];

    priceField.min = minPrice;
    priceField.placeholder = minPrice;
  };

  selectTypeOfHousing.addEventListener('change', selectTypeOfHousingChangeHandler);

  var selectRoomNumberChangeHandler = function () {

    if (selectCapacity.options.length > 0) {
      [].forEach.call(selectCapacity.options, function (item) {
        item.selected = ROOMS_CAPACITY[selectRoomNumber.value][0] === item.value;
        item.hidden = !(ROOMS_CAPACITY[selectRoomNumber.value].indexOf(item.value) >= 0);
        item.disabled = !(ROOMS_CAPACITY[selectRoomNumber.value].indexOf(item.value) >= 0);
      });
    }
  };

  selectRoomNumber.addEventListener('change', selectRoomNumberChangeHandler);

  selectRoomNumberChangeHandler();

  var selectTimeinChangeHandler = function () {
    selectTimeout.value = selectTimein.value;
  };

  selectTimein.addEventListener('change', selectTimeinChangeHandler);

  var selectTimeoutChangeHandler = function () {
    selectTimein.value = selectTimeout.value;
  };

  selectTimeout.addEventListener('change', selectTimeoutChangeHandler);

  var formElementSuccessHandler = function () {
    var popupSuccess = document.querySelector('#success');
    var element = popupSuccess.content.cloneNode(true);
    var elementContent = element.children[0];

    window.data.main.appendChild(element);

    var EscKeyDownHandler = function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        elementContent.remove();
      }
    };

    var messageRemoveHandler = function () {
      elementContent.remove();
    };

    document.addEventListener('keydown', EscKeyDownHandler);
    document.addEventListener('click', messageRemoveHandler);

    map.classList.add('map--faded');
    window.imagesUpload.formElement.classList.add('ad-form--disabled');
    window.imagesUpload.formElement.reset();
    toggleFormElementsState();
    window.map.remove();
    window.card.remove();
    window.pin.resetUserPinStartCoordinates();
    window.imagesUpload.resetAvatarPhoto();
    window.imagesUpload.resetUserPhoto();
    inputAddress.value = window.pin.getUserPinLocation();
    window.pin.userPin.addEventListener('mousedown', window.map.userPinfirstMousedownHandler);
  };

  var formElementErrorHandler = function () {
    var element = window.data.popupError.content.cloneNode(true);
    var elementContent = element.children[0];

    window.data.main.appendChild(element);

    var EscKeyDownHandler = function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        elementContent.remove();
      }
    };

    var messageRemoveHandler = function () {
      elementContent.remove();
    };

    document.addEventListener('keydown', EscKeyDownHandler);
    document.addEventListener('click', messageRemoveHandler);
  };

  var formElementSubmitHandler = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(window.imagesUpload.formElement), formElementSuccessHandler, formElementErrorHandler);
  };

  window.imagesUpload.formElement.addEventListener('submit', formElementSubmitHandler);

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

  window.form = {
    mapElement: map,
    inputAddress: inputAddress,
    toggleFormElementsState: toggleFormElementsState
  };
})();
