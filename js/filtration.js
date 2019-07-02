'use strict';

(function () {

  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = mapFiltersForm.querySelector('#housing-type');

  var filterHousingType = function (advertisements) {

    var advertisementsCopy = advertisements.slice();

    if (housingTypeSelect.children[1].selected) {

      return advertisementsCopy.filter(function (it) {
        return it.offer.type === 'palace';
      });
    } else if (housingTypeSelect.children[2].selected) {

      return advertisementsCopy.filter(function (it) {
        return it.offer.type === 'flat';
      });
    } else if (housingTypeSelect.children[3].selected) {

      return advertisementsCopy.filter(function (it) {
        return it.offer.type === 'house';
      });
    } else if (housingTypeSelect.children[4].selected) {

      return advertisementsCopy.filter(function (it) {
        return it.offer.type === 'bungalo';
      });
    }
    return advertisements;
  };

  window.filtration = {
    filterHousingType: filterHousingType,
    housingTypeSelect: housingTypeSelect
  };
})();
