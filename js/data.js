'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';

  window.download = function (successHandler, ErrorHandler) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      successHandler(xhr.response);
    });

    xhr.send();
    this.console.log(xhr);
  };

})();
