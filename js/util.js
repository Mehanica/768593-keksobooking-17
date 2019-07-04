'use strict';

(function () {

  function getInteger(min, max) {

    return Math.round(min + Math.random() * (max + 1 - min));
  }

  var getLimitedSizeArray = function (array, size) {

    if (array.length > size) {

      var copyArray = array.slice();
      var limitedArray = [];

      for (var i = 0; i < size; i++) {

        var randomArrayIndex = getInteger(0, copyArray.length - 1);
        limitedArray.push(copyArray[randomArrayIndex]);
        copyArray.splice(randomArrayIndex, 1);
      }
      return limitedArray;
    }
    return array;
  };

  window.util = {
    getLimitedSizeArray: getLimitedSizeArray
  };
})();
