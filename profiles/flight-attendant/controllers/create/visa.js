angular.module('create-flight-attendant-visa-controller', []);
angular.module('create-flight-attendant-visa-controller')
  .controller('createFlightAttendantVisaCtrl', function (
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
    $translate
  ) {
    // dataSelects.countries().then(function(response){ $scope.countries = response.data });
    // $scope.createFlightAttendant = simpleStorage.getter('createFlightAttendant');
    // $scope.simpleSave = simpleSave;
    // $scope.nestedObjectHandler = nestedObjectHandler;
    // $rootScope.$on('simpleStorageUpdated', function(event, updatedObject){
    //   $scope.createFlightAttendant = updatedObject;
    // });

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

    vm.validateVisa = validateVisa;

    function validateVisa() {
      var checkForm = AttendantService.visa($scope.createFlightAttendant);

      if (checkForm.flag) {
        $ionicPopup.alert({
          title: 'Something is missing!',
          template: checkForm.msg
        });
      } else {
        var url = $scope.nextURL.split('#');
        $location.path(url[1]);
      }
    }

  })
