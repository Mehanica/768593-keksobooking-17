'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  var TypePrice = {
    'flat': '1000',
    'bungalo': '0',
    'house': '5000',
    'palace': '10000'
  };

  var RoomsCapacity = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var map = document.querySelector('.map');
  var filtersForm = map.querySelector('.map__filters');
  var mapFilters = filtersForm.querySelectorAll('.map__filter');
  var mapFilterFeatures = filtersForm.querySelector('.map__features');
  var adFormElements = window.imagesUpload.adForm.querySelectorAll('.ad-form__element');
  var selectTypeOfHousing = window.imagesUpload.adForm.querySelector('#type');
  var priceField = window.imagesUpload.adForm.querySelector('#price');
  var selectRoomNumber = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');
  var selectTimein = window.imagesUpload.adForm.querySelector('#timein');
  var selectTimeout = window.imagesUpload.adForm.querySelector('#timeout');
  var titleField = window.imagesUpload.adForm.querySelector('#title');
  var inputAddress = document.querySelector('#address');
  var resetButton = window.imagesUpload.adForm.querySelector('.ad-form__reset');

  var toggleElementsListState = function (elementsList) {
    [].forEach.call(elementsList, function (item) {
      item.disabled = !item.disabled;
    });
  };

  var toggleFormElementsState = function () {
    toggleElementsListState(mapFilters);
    toggleElementsListState(adFormElements);
    toggleElementsListState(mapFilterFeatures);
    window.imagesUpload.avatarInput.disabled = !window.imagesUpload.avatarInput.disabled;
    window.imagesUpload.photoDropeZone.disabled = !window.imagesUpload.photoDropeZone.disabled;
  };

  var selectTypeOfHousingChangeHandler = function () {
    var minPrice = TypePrice[selectTypeOfHousing.value];

    priceField.min = minPrice;
    priceField.placeholder = minPrice;
  };

  selectTypeOfHousing.addEventListener('change', selectTypeOfHousingChangeHandler);

  var selectRoomNumberChangeHandler = function () {

    if (selectCapacity.options.length > 0) {
      [].forEach.call(selectCapacity.options, function (item) {
        var value = RoomsCapacity[selectRoomNumber.value];
        var isHidden = !(value.indexOf(item.value) >= 0);

        item.selected = value[0] === item.value;
        item.hidden = isHidden;
        item.disabled = isHidden;
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

  var resetApplication = function () {
    map.classList.add('map--faded');
    window.imagesUpload.adForm.classList.add('ad-form--disabled');
    window.imagesUpload.adForm.reset();
    toggleFormElementsState();
    window.map.remove();
    window.card.remove();
    window.pin.resetUserStartCoordinates();
    window.imagesUpload.resetAvatarPhoto();
    window.imagesUpload.resetUserPhoto();
    inputAddress.value = window.pin.getUserLocation();
    window.imagesUpload.disablePucturesDropZones();
    window.pin.mainLocation.addEventListener('mousedown', window.map.mainLocationFirstMousedownHandler);
  };

  var adFormSuccessHandler = function () {
    var popupSuccess = document.querySelector('#success');
    var element = popupSuccess.content.cloneNode(true);
    var elementContent = element.children[0];

    window.data.main.appendChild(element);

    var EscKeyDownHandler = function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        elementContent.remove();

        document.removeEventListener('keydown', EscKeyDownHandler);
        document.removeEventListener('click', messageRemoveHandler);
      }
    };

    var messageRemoveHandler = function () {
      elementContent.remove();

      document.removeEventListener('keydown', EscKeyDownHandler);
      document.removeEventListener('click', messageRemoveHandler);
    };

    document.addEventListener('keydown', EscKeyDownHandler);
    document.addEventListener('click', messageRemoveHandler);

    resetApplication();
  };

  var adFormErrorHandler = function () {
    var element = window.data.popupError.content.cloneNode(true);
    var elementContent = element.children[0];
    var errorButton = element.querySelector('.error__button');

    window.data.main.appendChild(element);

    var errorButtonClickHandler = function () {
      elementContent.remove();
    };

    var EscKeyDownHandler = function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        elementContent.remove();

        document.removeEventListener('keydown', EscKeyDownHandler);
        document.removeEventListener('click', messageRemoveHandler);
      }
    };

    var messageRemoveHandler = function () {
      elementContent.remove();

      document.removeEventListener('keydown', EscKeyDownHandler);
      document.removeEventListener('click', messageRemoveHandler);
    };

    errorButton.addEventListener('click', errorButtonClickHandler);
    document.addEventListener('keydown', EscKeyDownHandler);
    document.addEventListener('click', messageRemoveHandler);
  };

  var adFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.data.upload(adFormErrorHandler, adFormSuccessHandler, new FormData(window.imagesUpload.adForm));
  };

  window.imagesUpload.adForm.addEventListener('submit', adFormSubmitHandler);

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

  var resetButtonClickHandler = function () {
    resetApplication();
  };

  resetButton.addEventListener('click', resetButtonClickHandler);

  window.form = {
    cityMap: map,
    inputAddress: inputAddress,
    toggleFormElementsState: toggleFormElementsState
  };
})();
