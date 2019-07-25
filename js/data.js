'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking';
  var SUCCESSFUL_STATUS = 200;
  var XHR_TIMEOUT = 5000;
  var main = document.querySelector('main');
  var popupError = document.querySelector('#error');

  var errorHandler = function () {
    var element = popupError.content.cloneNode(true);
    var errorButton = element.querySelector('.error__button');
    var errorMassage = element.querySelector('.error__message');

    errorMassage.innerHTML = 'Ошибка загрузки данных';
    main.appendChild(element);

    var errorButtonClickHandler = function () {
      document.location.reload();
    };

    errorButton.addEventListener('click', errorButtonClickHandler);
  };

  var createRequest = function (onError, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      if (xhr.status === SUCCESSFUL_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('timeout', onError);
    xhr.timeout = XHR_TIMEOUT;

    return xhr;
  };

  var download = function (onSuccess) {
    var xhr = createRequest(errorHandler, onSuccess);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var upload = function (onError, onSuccess, data) {
    var xhr = createRequest(onError, onSuccess);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.data = {
    main: main,
    popupError: popupError,
    download: download,
    upload: upload
  };
})();
