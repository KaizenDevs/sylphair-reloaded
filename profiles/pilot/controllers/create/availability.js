angular.module('availability-controller', []);
angular.module('availability-controller', [])
  .controller('availabilityCtrl', function (
    $scope,
    simpleSave,
    localStorageService,
    nestedObjectHandler,
    $rootScope,
    profileDataManagement,
    $ionicHistory,
    EditProfileRouter,
    $ionicPopup,
    $location,
    PilotService,
    $translate
  ) {

    var vm = this;
    vm.showMissAlert = false;

    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url);
    $scope.backURL = $scope.URLs.backURL;
    $scope.nextURL = $scope.URLs.nextURL;
    var userID = localStorageService.get('user_data').data.id;
    $scope.currentKey = profileDataManagement.defineKey(userID, 'Pilot', 'create');
    $scope.createPilot = profileDataManagement.get(userID, 'Pilot', 'create')
    $scope.simpleSave = simpleSave;
    $scope.nestedObjectHandler = nestedObjectHandler;
    $rootScope.$on('simpleStorageUpdated', function (event, updatedObject) {
      $scope.createPilot = updatedObject;
    });

    // Methods

    vm.validateAvailability = validateAvailability;

    function validateAvailability() {
      var checkForm = PilotService.availability($scope.createPilot);
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
