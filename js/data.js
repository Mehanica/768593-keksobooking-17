'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data22';
  var URL_SEND = 'https://js.dump.academy/keksobooking';
  var SUCCESSFUL_STATUS = 200;
  var XHR_TIMEOUT = 5000;
  var mainElement = document.querySelector('main');
  var popupError = document.querySelector('#error');

  var onError = function () {
    var element = popupError.content.cloneNode(true);
    var errorButton = element.querySelector('.error__button');
    var errorMassage = element.querySelector('.error__message');

    errorMassage.innerHTML = 'Ошибка загрузки данных';
    mainElement.appendChild(element);

    var errorButtonClickHandler = function () {
      document.location.reload();
    };

    errorButton.addEventListener('click', errorButtonClickHandler);
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

      if (xhr.status === SUCCESSFUL_STATUS) {
        formElementSuccessHandler();
      } else {
        formElementErrorHandler();
      }
    });

    xhr.addEventListener('timeout', formElementErrorHandler);
    xhr.timeout = XHR_TIMEOUT;
    xhr.open('POST', URL_SEND);
    xhr.send(data);
  };

  window.data = {
    main: mainElement,
    popupError: popupError
  };
})();
