angular.module('create-flight-attendant-profile-controller', []);
angular.module('create-flight-attendant-profile-controller')
  .controller('CreateFlightAttendantProfileCtrl', function (
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
    AttendantService,
    $ionicScrollDelegate,
    $translate
  ) {

    var vm = this;

    vm.showMissAlert = false;

    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url);
    $scope.backURL = $scope.URLs.backURL;
    $scope.nextURL = $scope.URLs.nextURL;

    var userID = localStorageService.get('user_data').data.id;
    $scope.currentKey = profileDataManagement.defineKey(userID, 'FlightAttendant', 'create');
    $scope.createFlightAttendant = profileDataManagement.get(userID, 'FlightAttendant', 'create')
    $scope.simpleSave = simpleSave;
    $scope.nestedObjectHandler = nestedObjectHandler;

    $rootScope.$on('simpleStorageUpdated', function (event, updatedObject) {
      $scope.createFlightAttendant = updatedObject;
    });

    // Methods

    vm.validateProfile = validateProfile;

    function validateProfile() {
      var checkForm = AttendantService.profile($scope.createFlightAttendant);
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

    $scope.goDown = function () {
      $ionicScrollDelegate.scrollTo(0, 1000);
    }


  })
