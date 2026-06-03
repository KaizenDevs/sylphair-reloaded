angular.module('create-flight-attendant-professional-experience-controller', []);
angular.module('create-flight-attendant-professional-experience-controller')
  .controller('createFlightAttendantProfessionalExperienceCtrl', function (
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
    resolvedAllAircrafts,
    $translate
  ) {

    var vm = this;

    vm.showMissAlert = false;

    // dataSelects.aircrafts().then(function(response){ $scope.aircrafts = response.data });
    // dataSelects.countries().then(function(response){ $scope.countries = response.data });
    // dataSelects.mechanic_issuance_authorities().then(function(response)
    //{ $scope.issuance_authorities = response.data });
    // $scope.createFlightAttendant = simpleStorage.getter('createFlightAttendant');
    // $scope.simpleSave = simpleSave;
    // $scope.nestedObjectHandler = nestedObjectHandler;
    // $rootScope.$on('simpleStorageUpdated', function(event, updatedObject){
    //   $scope.createFlightAttendant = updatedObject;
    // });
    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url);
    $scope.backURL = $scope.URLs.backURL;
    $scope.nextURL = $scope.URLs.nextURL;

    var userID = localStorageService.get('user_data').data.id;
    $scope.currentKey = profileDataManagement.defineKey(userID, 'FlightAttendant', 'create');
    $scope.createFlightAttendant = profileDataManagement.get(userID, 'FlightAttendant', 'create')
    $scope.simpleSave = simpleSave;
    $scope.nestedObjectHandler = nestedObjectHandler;
    $scope.aircrafts = resolvedAllAircrafts;

    $rootScope.$on('simpleStorageUpdated', function (event, updatedObject) {
      $scope.createFlightAttendant = updatedObject;
    });

    //Methods

    vm.validateExperience = validateExperience;

    function validateExperience() {
      var checkForm = AttendantService.professional($scope.createFlightAttendant);
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
