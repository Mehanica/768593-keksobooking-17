'use strict';

(function () {

  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = mapFiltersForm.querySelector('#housing-type');

  var filterHousingType = function (advertisements) {

    var advertisementsCopy = advertisements.slice();

    if (housingTypeSelect.value !== 'any') {
      return advertisementsCopy.filter(function (it) {

        return it.offer.type === housingTypeSelect.value;
      });
    }

    return advertisements;
  };

  window.filtration = {
    filterHousingType: filterHousingType,
    housingTypeSelect: housingTypeSelect
  };
})();
