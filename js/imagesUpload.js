'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var adForm = document.querySelector('.ad-form');
  var avatarInput = adForm.querySelector('.ad-form__field input[type=file]');
  var avatarDropZone = adForm.querySelector('.ad-form-header__drop-zone');
  var userPhotoDropZone = adForm.querySelector('.ad-form__drop-zone');
  var preview = adForm.querySelector('.ad-form-header__preview img');
  var defaultAvatarSrc = 'img/muffin-grey.svg';
  var photoDropZone = adForm.querySelector('.ad-form__upload input[type=file]');
  var photoContainer = adForm.querySelector('.ad-form__photo');

  var avatarInputChangeHandler = function () {
    var file = avatarInput.files[0];
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

  var avatarDropZoneDragenterHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.target.style.backgroundColor = 'lightgreen';
  };

  var avatarDropZoneDragoverHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.target.style.backgroundColor = 'lightgreen';
  };

  var avatarDropZoneDragleaveHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.target.style.backgroundColor = '';
  };

  var avatarDropZoneDropHandlder = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.target.style.backgroundColor = '';
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

  var photoDropZoneChangeHandler = function () {
    var file = photoDropZone.files[0];
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
  };

  var userPhotoDropZoneDragenterHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.target.style.backgroundColor = 'lightgreen';
  };

  var userPhotoDropZoneDragoverHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.target.style.backgroundColor = 'lightgreen';
  };

  var userPhotoDropZoneDragleaveHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.target.style.backgroundColor = '';
  };

  var userPhotoDropZoneDropHandler = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.target.style.backgroundColor = '';
    evt.dataTransfer.dropEffect = 'copy';
    [].forEach.call(evt.dataTransfer.files, function (file) {
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
  };

  var enablePicturesUpload = function () {
    avatarInput.addEventListener('change', avatarInputChangeHandler);
    avatarDropZone.addEventListener('dragenter', avatarDropZoneDragenterHandler, false);
    avatarDropZone.addEventListener('dragover', avatarDropZoneDragoverHandler, false);
    avatarDropZone.addEventListener('dragleave', avatarDropZoneDragleaveHandler, false);
    avatarDropZone.addEventListener('drop', avatarDropZoneDropHandlder, false);
    photoDropZone.addEventListener('change', photoDropZoneChangeHandler);
    userPhotoDropZone.addEventListener('dragenter', userPhotoDropZoneDragenterHandler, false);
    userPhotoDropZone.addEventListener('dragover', userPhotoDropZoneDragoverHandler, false);
    userPhotoDropZone.addEventListener('dragleave', userPhotoDropZoneDragleaveHandler, false);
    userPhotoDropZone.addEventListener('drop', userPhotoDropZoneDropHandler, false);
  };

  var disablePicturesUpload = function () {
    avatarInput.removeEventListener('change', avatarInputChangeHandler);
    avatarDropZone.removeEventListener('dragenter', avatarDropZoneDragenterHandler, false);
    avatarDropZone.removeEventListener('dragover', avatarDropZoneDragoverHandler, false);
    avatarDropZone.removeEventListener('dragleave', avatarDropZoneDragleaveHandler, false);
    avatarDropZone.removeEventListener('drop', avatarDropZoneDropHandlder, false);
    photoDropZone.removeEventListener('change', photoDropZoneChangeHandler);
    userPhotoDropZone.removeEventListener('dragenter', userPhotoDropZoneDragenterHandler, false);
    userPhotoDropZone.removeEventListener('dragover', userPhotoDropZoneDragoverHandler, false);
    userPhotoDropZone.removeEventListener('dragleave', userPhotoDropZoneDragleaveHandler, false);
    userPhotoDropZone.removeEventListener('drop', userPhotoDropZoneDropHandler, false);
  };

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
    adForm: adForm,
    avatarInput: avatarInput,
    photoDropZone: photoDropZone,
    resetAvatarPhoto: resetAvatarPhoto,
    resetUserPhoto: resetUserPhoto,
    enablePicturesDropZones: enablePicturesUpload,
    disablePicturesDropZones: disablePicturesUpload
  };
})();
