'use strict';

(function () {

  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = mapFiltersForm.querySelector('#housing-type');

  var filterHousingType = function () {
    window.card.remove();

    var filteredPins = window.map.data().slice();

    if (housingTypeSelect.value !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        return it.offer.type === housingTypeSelect.value;
      });
    }

    window.map.render(filteredPins.slice(0, window.map.DISPLAY_PINS_LIMIT));
  };

  mapFiltersForm.addEventListener('change', filterHousingType);

  window.filtration = {
    filterHousingType: filterHousingType,
    housingTypeSelect: housingTypeSelect
  };
})();
