angular.module('registration-controller', []);
angular.module('registration-controller', [])
  .controller('RegistrationCtrl', function (
    $cordovaCamera,
    $ionicHistory,
    $ionicLoading,
    $ionicModal,
    $ionicPopup,
    $rootScope,
    $scope,
    $timeout,
    CAMERA_OPTIONS,
    Session,
    traitInitializer,
    UserCreate,
    $ionicScrollDelegate,
    CONFIG,
    $translate
  ) {

    Session.listener();
    $scope.user = traitInitializer.get('user');
    $scope.user.termsAccept = false;

    // $scope.user.profile = "pilot"
    // $scope.user.name = "German"
    // $scope.user.last_name = "Hernandez"
    // $scope.user.email = "muygrafico+35@gmail.com"
    // $scope.user.password = "12345678"

    $scope.goBack = function () {
      $ionicHistory.goBack()
    }

    $scope.termsChange = function (registerForm) {
      $scope.user.termsAccept = !$scope.user.termsAccept;
      if (!$scope.user.termsAccept) {
        registerForm.acceptTerms.$setTouched();
        registerForm.acceptTerms.$invalid = true;
      }
    }

    $scope.doRegister = function (registerForm) {
      if (!$scope.user.termsAccept) {
        registerForm.acceptTerms.$setTouched();
        registerForm.acceptTerms.$invalid = true;
      }
      registerForm.$touched = true;
      if (registerForm.$valid && registerForm.confirm_password.$valid && $scope.user.termsAccept === true) {
        registerForm.$touched = false;
        $scope.submit();
      }
    };

    $scope.showAlert = function () {
      var WelcomePopup = $ionicPopup.alert({
        title: $translate.instant('welcome_modal_msg'),
        template: $translate.instant('welcome_info_msg'),
        okText: $translate.instant('modal_ok_btn')
      });
      WelcomePopup.then(function ( /*res*/ ) {
        $timeout(function () {
          var user = {
            password: $scope.user.password,
            email: $scope.user.email
          };
          Session.new(user);
          $scope.user = traitInitializer.get('user');
          // registerForm.$touched = false;
        }, 1);
      });
    }

    $scope.checkPasswordMatch = function (form) {
      var valid = true;
      var data = $scope.user;
      valid = data.password === data.confirm_password;
      form.confirm_password.$invalid = !valid;
      form.confirm_password.$valid = valid;
    }

    $scope.submit = function () {
      $ionicLoading.show();
      var new_user;
      if ($scope.imgURI == undefined) {
        new_user = new UserCreate({
          user: $scope.user,
          user_type: 'pilot'
        });
      } else {
        var imagebase64 = $scope.imgURI.split("data:image/jpeg;base64,")[1];
        new_user = new UserCreate({
          "user": $scope.user,
          "user_type": 'pilot',
          "avatar": {
            "data": imagebase64,
            "filename": "avatar.jpg",
            "content_type": "image/jpg"
          }
        });
      }

      new_user.$save(
        function (data) {
          $ionicLoading.hide();
          $scope.showAlert();
        },
        function (err) {
          Raven.captureMessage(err);
          $rootScope.$broadcast('loading:hide');
          var errors = err["data"]["errors"];
          var errorsResult = [];
          angular.forEach(errors, function (value, key) {
            this.push(key + ': ' + value + '\n');
          }, errorsResult);

          if (err["status"] == '404') {
            errorsResult = 'Cant reach the server, please check you internet connection.'
          }
          $ionicPopup.alert({
            title: 'An error occured: ',
            template: errorsResult
          });
        }
      );
    };

    $scope.goDown = function () {
      $ionicScrollDelegate.scrollTo(0, 1000);
    }

    $scope.images = [];

    $scope.takePhoto = function () {
      var takePhotoOptions = CAMERA_OPTIONS;
      takePhotoOptions.sourceType = 1;
      $cordovaCamera.getPicture(takePhotoOptions).then(function (imageData) {
        $scope.closeModal();
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        Raven.captureMessage(err);
      });
    }

    $scope.choosePhoto = function () {
      var choosePhotoOptions = CAMERA_OPTIONS;
      choosePhotoOptions.sourceType = 0;
      $cordovaCamera.getPicture(choosePhotoOptions).then(function (imageData) {
        $scope.closeModal();
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        Raven.captureMessage(err);
      });
    }

    $ionicModal.fromTemplateUrl('add-a-picture.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.modal.show()
    }
    $scope.closeModal = function () {
      $scope.modal.hide()
    }
    $scope.$on('$destroy', function () {
      $scope.modal.remove()
    });

    $scope.redirectTerms = function () {
      window.open(CONFIG.PRIVACY_LINK, '_system', 'location=yes');
    }

  })
