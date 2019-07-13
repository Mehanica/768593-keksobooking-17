'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';
  var SUCCESSFUL_STATUS = 200;

  var onError = function () {
    var popupError = document.querySelector('#error');
    var element = popupError.content.cloneNode(true);
    var main = document.querySelector('main');

    main.appendChild(element);
  };

  window.download = function (onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {

      if (xhr.status === SUCCESSFUL_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.send();
  };

  window.upload = function (data, formElementSuccessHandler, formElementErrorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      formElementSuccessHandler(xhr.response);
    });

    xhr.open('POST', URL_SEND);
    xhr.send(data);
  };

})();
