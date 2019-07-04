'use strict';

(function () {

  var TYPE_PRICE = {
    'flat': '1000',
    'bungalo': '0',
    'house': '5000',
    'palace': '10000'
  };

  var selectTypeOfHousing = window.map.form.querySelector('#type');
  var priceField = window.map.form.querySelector('#price');

  var selectTypeOfHousingChangeHandler = function () {

    var minPrice = TYPE_PRICE[selectTypeOfHousing.value];
    priceField.min = minPrice;
    priceField.value = minPrice;
    priceField.placeholder = minPrice;
  };

  selectTypeOfHousing.addEventListener('change', selectTypeOfHousingChangeHandler);

  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': [0]
  };

  var selectRoomNumber = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');

  var selectRoomNumberChangeHandler = function () {

    if (selectCapacity.options.length > 0) {
      [].forEach.call(selectCapacity.options, function (item) {

        item.selected = (ROOMS_CAPACITY[selectRoomNumber.value][0] === item.value) ? true : false;
        item.hidden = (ROOMS_CAPACITY[selectRoomNumber.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  };

  selectRoomNumber.addEventListener('change', selectRoomNumberChangeHandler);

  selectRoomNumberChangeHandler();

  var selectTimein = window.map.form.querySelector('#timein');
  var selectTimeout = window.map.form.querySelector('#timeout');

  var selectTimeinChangeHandler = function () {

    selectTimeout.value = selectTimein.value;
  };

  selectTimein.addEventListener('change', selectTimeinChangeHandler);

  var selectTimeoutChangeHandler = function () {

    selectTimein.value = selectTimeout.value;
  };

  selectTimeout.addEventListener('change', selectTimeoutChangeHandler);

  var titleField = window.map.form.querySelector('#title');

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
})();
