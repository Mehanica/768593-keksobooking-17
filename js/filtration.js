'use strict';

(function () {

  var housingPrice = {
    'low': {
      start: 0,
      end: 10000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var mapFiltersForm = document.querySelector('.map__filters');
  var housingTypeSelect = mapFiltersForm.querySelector('#housing-type');
  var filterOptions = Array.from(mapFiltersForm.children);

  var filterRules = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },

    'housing-price': function (data, filter) {
      return data.offer.price >= housingPrice[filter.value].start && data.offer.price < housingPrice[filter.value].end;
    },

    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },

    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },

    'housing-features': function (data, filter) {
      var filterCheckboxes = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

      return filterCheckboxes.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  var filterData = function (data) {
    return data.filter(function (item) {
      return filterOptions.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  var filterHousingType = function () {
    window.card.remove();

    var filteredPins = filterData(window.map.data().slice());

    window.map.render(filteredPins.slice(0, window.map.DISPLAY_PINS_LIMIT));
  };

  mapFiltersForm.addEventListener('change', filterHousingType);

  window.filtration = {
    filterHousingType: filterHousingType,
    housingTypeSelect: housingTypeSelect
  };
})();
