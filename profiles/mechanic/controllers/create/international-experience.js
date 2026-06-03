angular.module('create-mechanic-international-experience-controller', []);
angular.module('create-mechanic-international-experience-controller')
  .controller('CreateMechanicInternationExperienceCtrl',
    function ($scope,
      simpleSave,
      localStorageService,
      nestedObjectHandler,
      $rootScope,
      profileDataManagement,
      $ionicHistory,
      EditProfileRouter,
      $ionicPopup,
      $location,
      MechanicService,
      $translate
    ) {

      var vm = this;
      vm.showMissAlert = false;

      $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url);
      $scope.backURL = $scope.URLs.backURL;
      $scope.nextURL = $scope.URLs.nextURL;

      var userID = localStorageService.get('user_data').data.id;
      $scope.currentKey = profileDataManagement.defineKey(userID, 'Mechanic', 'create');
      $scope.createMechanic = profileDataManagement.get(userID, 'Mechanic', 'create')
      $scope.simpleSave = simpleSave;
      $scope.nestedObjectHandler = nestedObjectHandler;

      $rootScope.$on('simpleStorageUpdated', function (event, updatedObject) {
        $scope.createMechanic = updatedObject;
      });

      // Methods

      vm.validateInternational = validateInternational;

      function validateInternational() {
        var checkForm = MechanicService.international($scope.createMechanic);
        if (checkForm.flag) {
          $ionicPopup.alert({
            title: $translate.instant('error_modal_title_msg'),
            template: checkForm.msg,
            okText: $translate.instant('modal_ok_btn')
          });
        } else {
          var url = $scope.nextURL.split('#');
          $location.path(url[1]);
        }
      }

    })
