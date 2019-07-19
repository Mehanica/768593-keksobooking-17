'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var formElement = document.querySelector('.ad-form');
  var fileDropZone = formElement.querySelector('.ad-form__field input[type=file]');
  var preview = formElement.querySelector('.ad-form-header__preview img');
  var defaultAvatarSrc = 'img/muffin-grey.svg';
  var photoDropeZone = formElement.querySelector('.ad-form__upload input[type=file]');
  var photoContainer = formElement.querySelector('.ad-form__photo');

  fileDropZone.addEventListener('change', function () {
    var file = fileDropZone.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  var preventDefaults = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  var highlight = function (evt) {
    evt.target.style.backgroundColor = 'green';
  };

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    fileDropZone.addEventListener(eventName, preventDefaults, false);
  });

  fileDropZone.addEventListener('drop', handleDrop, false);

  var handleDrop = function (evt) {
    evt.dataTransfer.dropEffect = 'copy';
    var file = evt.dataTransfer.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  ['dragenter', 'dragover'].forEach(function (eventName) {
    fileDropZone.addEventListener(eventName, highlight, false);
  });

  photoDropeZone.addEventListener('change', function () {
    var file = photoDropeZone.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var image = document.createElement('img');
        image.width = '75';
        image.height = '70';
        image.src = reader.result;

        photoContainer.appendChild(image);
      });
      reader.readAsDataURL(file);
    }
  });

  var resetAvatarPhoto = function () {
    if (preview.src !== defaultAvatarSrc) {
      preview.src = defaultAvatarSrc;
    }
  };

  var resetUserPhoto = function () {
    if (photoContainer.children.length > 0) {
      photoContainer.innerHTML = '';
    }
  };

  window.imagesUpload = {
    formElement: formElement,
    resetAvatarPhoto: resetAvatarPhoto,
    resetUserPhoto: resetUserPhoto
  };
})();
