'use strict';

(function () {

  function getInteger(min, max) {

    return Math.round(min + Math.random() * (max + 1 - min));
  }

  window.util = {
    getInteger: getInteger
  };
})();
