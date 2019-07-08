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

  var getCorrectNominativeCase = function (x, nouns) {

    var sN = x.toString();

    if (x > 10 && x < 20) {
      return x + ' ' + nouns[2];
    } else if (sN.substring(sN.length - 2) > x && x < sN.substring(sN.length - 2)) {
      return x + ' ' + nouns[2];
    } else if (Number.isInteger((x - 1) / 10)) {
      return x + ' ' + nouns[0];
    } else if (Number.isInteger((x + 8) / 10) || Number.isInteger((x + 7) / 10) || Number.isInteger((x + 6) / 10)) {
      return x + ' ' + nouns[1];
    } else {
      return x + ' ' + nouns[2];
    }
  };

  var getCorrectParentCase = function (x, nouns) {

    var sN = x.toString();

    if (Number.isInteger((x - 1) / 10) && sN.substring(sN.length - 2) !== 11) {
      return x + ' ' + nouns[0];
    }
    return x + ' ' + nouns[1];
  };

  window.util = {
    getLimitedSizeArray: getLimitedSizeArray,
    getCorrectNominativeCase: getCorrectNominativeCase,
    getCorrectParentCase: getCorrectParentCase
  };
})();
