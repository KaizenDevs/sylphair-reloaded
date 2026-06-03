angular.module('edit-user-controller', []);
angular.module('edit-user-controller', [])
  .controller('EditUserCtrl', function ($rootScope, $scope, localStorageService, $ionicModal, $cordovaCamera, $state, $ionicHistory, $ionicLoading, $ionicPopup, $http, dataSelects, CONFIG, $ionicScrollDelegate, $translate, reset, $location) {

    $scope.all_user_data = localStorageService.get('user_data').data;
    $scope.newPicture = false;
    $scope.user = {};
    $scope.aircraft_owner = {};
    $scope.copy_user = {};
    $scope.user.avatar = $scope.all_user_data.avatar;
    $scope.user.name = $scope.all_user_data.name;
    $scope.user.last_name = $scope.all_user_data.last_name;
    $scope.user.hide_from_searches = $scope.all_user_data.hide_from_searches;
    $scope.all_user_data = localStorageService.get('user_data').data;

    $scope.is_aircraft_owner = function () {
      return $scope.all_user_data.role === 'aircraft owner';
    }

    if ($scope.is_aircraft_owner()) {
      $scope.aircraft_owner.phone = parseInt($scope.all_user_data.aircraft_owner.phone);
      $scope.aircraft_owner.address = $scope.all_user_data.aircraft_owner.address;
      $scope.aircraft_owner.country_id = $scope.all_user_data.aircraft_owner.country_id;
      $scope.aircraft_owner.skype = $scope.all_user_data.aircraft_owner.skype;
      $scope.aircraft_owner.website = $scope.all_user_data.aircraft_owner.website;
      $scope.aircraft_owner.company_name = $scope.all_user_data.aircraft_owner.company_name;
    }

    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.onError = function (title, template, error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: $translate.instant('error_submit_modal_title'),
        template: $translate.instant('error_submit_modal_msg'),
        okText: $translate.instant('modal_ok_btn')
      });
    }

    $scope.doRegister = function (registerForm) {
      registerForm.$touched = true;
      if (registerForm.$valid) {
        $scope.submit();
      }
    };

    $scope.endEdit = function (response) {
      $ionicLoading.hide();
      $scope.goBack();
    }

    $scope.sendAircraftInformation = function () {
      var req_aircraft_owner = {
        method: 'PUT',
        url: CONFIG.COMPLETE_API_URL + '/aircraft_owners/itShouldBeTheIDButisNot',
        data: $scope.aircraft_owner
      }
      $http(req_aircraft_owner).then(function (response) {
        $scope.endEdit(response);
      }, function (error) {
        $scope.onError($translate.instant('error_submit_modal_title'), $translate.instant('error_submit_modal_msg'), error);
      });
    }

    $scope.submit = function () {
      $ionicLoading.show();
      if (!$scope.user.password >= 8 || $scope.user.password == "") delete $scope.user.password;
      angular.copy($scope.user, $scope.copy_user);

      if ($scope.imgURI == undefined) {
        edited_user = {
          user: $scope.copy_user
        };
        if (!$scope.newPicture) delete edited_user.user.avatar;
      } else {
        var imagebase64 = $scope.imgURI.split("data:image/jpeg;base64,")[1];
        var edited_user = {
          "user": $scope.copy_user,
          "avatar": {
            "data": imagebase64,
            "filename": "avatar.jpg",
            "content_type": "image/jpg"
          }
        }
      }


      var req = {
        method: 'PUT',
        url: CONFIG.COMPLETE_API_URL + '/users/edit',
        data: edited_user
      }
      $http(req).then(function (response) {
        localStorageService.set('user_data', {
          'data': response.data
        })
        if ($scope.is_aircraft_owner()) $scope.sendAircraftInformation();
        if (!$scope.is_aircraft_owner()) $scope.endEdit(response);
      }, function (error) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: $translate.instant('error_submit_modal_title'),
          template: $translate.instant('error_submit_modal_msg'),
          okText: $translate.instant('modal_ok_btn')
        });
      });

    };

    $scope.goDown = function () {
      $ionicScrollDelegate.scrollTo(0, 1000);
    }

    $scope.images = [];

    // IMPORTANT - INSTALL CORDOVA PLUGIN CAMERA WITH COMMAND: cordova plugin add cordova-plugin-camera

    $scope.takePhoto = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.closeModal();
        $scope.newPicture = true;
        $scope.user.avatar = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        Raven.captureMessage(err);
      });
    }

    $scope.choosePhoto = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.closeModal();
        $scope.newPicture = true;
        $scope.user.avatar = "data:image/jpeg;base64," + imageData;
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
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.deleteAccount= function() {
      var req = {
        method: 'DELETE',
        url: CONFIG.COMPLETE_API_URL + '/users/edit'
      }

      $http(req).then(function (response) {
        $rootScope.$emit('session', false)
          reset.userData()
          $location.path('/start')
      }, function (error) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: $translate.instant('error_submit_modal_title'),
          template: $translate.instant('error_submit_modal_msg'),
          okText: $translate.instant('modal_ok_btn')
        });
      });
    }

    $scope.deleteAccountAlert = function() {
      var DeleteAccountPopup = $ionicPopup.confirm({
        title: 'Delete Account',
        template: 'Your information will be deleted, this action cannot be undone',
        okText: 'Delete',
        cancelText: 'Cancel',
      });
      DeleteAccountPopup.then(function (res) {
        if(res) $scope.deleteAccount();
      });
    }

  })
