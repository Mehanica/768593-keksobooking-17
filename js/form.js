'use strict';

(function () {
  var selectTypeOfHousing = window.map.form.querySelector('#type');
  var priceField = window.map.form.querySelector('#price');

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

  var selectTimein = window.map.form.querySelector('#timein');
  var selectTimeout = window.map.form.querySelector('#timeout');

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
