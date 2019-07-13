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

  var formElement = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var mapFilters = filtersForm.querySelectorAll('.map__filter');
  var adFormElements = formElement.querySelectorAll('.ad-form__element');
  var selectTypeOfHousing = formElement.querySelector('#type');
  var priceField = formElement.querySelector('#price');
  var selectRoomNumber = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');
  var selectTimein = formElement.querySelector('#timein');
  var selectTimeout = formElement.querySelector('#timeout');
  var titleField = formElement.querySelector('#title');
  var inputAddress = document.querySelector('#address');


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

  var selectTypeOfHousingChangeHandler = function () {
    var minPrice = TYPE_PRICE[selectTypeOfHousing.value];

    priceField.min = minPrice;
    priceField.value = minPrice;
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
    var main = document.querySelector('main');

    main.appendChild(element);

    formElement.reset();
    toggleFormElementsState();
    window.map.remove();
    window.card.remove();
    window.pin.resetUserPinStartCoordinates();
    inputAddress.value = window.pin.getUserPinLocation();
  };

  var formElementErrorHandler = function () {

  };

  var formElementSubmitHandler = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(formElement), formElementSuccessHandler, formElementErrorHandler);
  };

  formElement.addEventListener('submit', formElementSubmitHandler);

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
    inputAddress: inputAddress,
    formElement: formElement,
    toggleFormElementsState: toggleFormElementsState
  };
})();
