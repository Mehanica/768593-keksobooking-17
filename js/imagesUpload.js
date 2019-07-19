'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var formElement = document.querySelector('.ad-form');
  var fileChooser = formElement.querySelector('.ad-form__field input[type=file]');
  var avatarDropZone = formElement.querySelector('.ad-form-header__drop-zone');
  var userPhotoDropZone = formElement.querySelector('.ad-form__drop-zone');
  var preview = formElement.querySelector('.ad-form-header__preview img');
  var defaultAvatarSrc = 'img/muffin-grey.svg';
  var photoDropeZone = formElement.querySelector('.ad-form__upload input[type=file]');
  var photoContainer = formElement.querySelector('.ad-form__photo');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
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

  var unhighlight = function (evt) {
    evt.target.style.backgroundColor = '';
  };

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

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    avatarDropZone.addEventListener(eventName, preventDefaults, false);
  });

  ['dragenter', 'dragover'].forEach(function (eventName) {
    avatarDropZone.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(function (eventName) {
    avatarDropZone.addEventListener(eventName, unhighlight, false);
  });

  avatarDropZone.addEventListener('drop', handleDrop, false);

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

  var handleDropUserPhoto = function (evt) {
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

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    userPhotoDropZone.addEventListener(eventName, preventDefaults, false);
  });

  ['dragenter', 'dragover'].forEach(function (eventName) {
    userPhotoDropZone.addEventListener(eventName, highlight, false);
  });

  ['dragleave', 'drop'].forEach(function (eventName) {
    userPhotoDropZone.addEventListener(eventName, unhighlight, false);
  });

  userPhotoDropZone.addEventListener('drop', handleDropUserPhoto, false);


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
