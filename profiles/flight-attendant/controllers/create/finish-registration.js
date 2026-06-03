angular.module('create-flight-attendant-finish-registration-controller', []);
angular.module('create-flight-attendant-finish-registration-controller')
  .controller('createFlightAttendantFinishRegistrationCtrl', function (
    $http,
    $rootScope,
    $scope,
    $location,
    $ionicLoading,
    $filter,
    simpleStorage,
    localStorageService,
    sendProfileObject,
    traitInitializer,
    toggler,
    $timeout,
    $ionicPopup,
    $ionicScrollDelegate,
    profileDataManagement,
    CrewMember,
    User,
    Utils,
    $ionicHistory,
    EditProfileRouter,
    $translate
  ) {

    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url);
    $scope.backURL = $scope.URLs.backURL;

    var userID = localStorageService.get('user_data').data.id;
    $scope.FlightAttendant = profileDataManagement.get(userID, 'FlightAttendant', 'create')
    $scope.user = simpleStorage.getter('user_data').data;

    if ($scope.FlightAttendant.unavailable_days_attributes != undefined && $scope.FlightAttendant.unavailable_days_attributes.length > 0) $scope.datesRanges = $filter('dataRanges')($scope.FlightAttendant.unavailable_days_attributes);
    $scope.FlightAttendant = sendProfileObject.cleanArrays($scope.FlightAttendant);

    $scope.submit = function () {
      $scope.FlightAttendant.profile.role = "flight attendant";
      localStorageService.set('tempTEST', $scope.FlightAttendant)
      CrewMember.new({
        'crew_member': $scope.FlightAttendant
      });
    };

    $scope.$on('CrewMemberProfileCreated', function (event, status) {
      User.get().then(function (response) {
        $scope.user = response;
        localStorageService.set('user_data', {
          data: response
        });
        $ionicPopup.alert({
          title: $translate.instant('application_sent_label'),
          template: $translate.instant('application_sent_info'),
          okText: $translate.instant('modal_ok_btn')
        });
        $location.path('app-flight-attendant/home');
        localStorageService.remove($scope.currentKey);
        $ionicLoading.hide();
      }, function (response) {
        Utils.showError(response);
      });

    });


    $scope.toggleGroup = function (state, variable) {
      $scope[variable] = toggler.toggle($scope[variable]);
      $timeout(function () {
        $ionicScrollDelegate.resize();
      }, 100);
    };

    $scope.goDown = function () {
      $ionicScrollDelegate.scrollTo(0, 1000);
    }

  })
