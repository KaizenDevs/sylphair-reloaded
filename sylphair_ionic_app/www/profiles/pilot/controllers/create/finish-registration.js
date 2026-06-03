angular.module('pilot-finish-registration-controller', []);
angular.module('pilot-finish-registration-controller')
  .controller('pilotFinishRegistrationCtrl', function (
    $filter,
    $http,
    $ionicHistory,
    $ionicLoading,
    $ionicPopup,
    $ionicScrollDelegate,
    $location,
    $rootScope,
    $scope,
    $timeout,
    EditProfileRouter,
    localStorageService,
    Pilot,
    profileDataManagement,
    sendProfileObject,
    simpleStorage,
    toggler,
    traitInitializer,
    User,
    Utils,
    resolvedAllAircrafts,
    $translate
  ) {

    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url);
    $scope.backURL = $scope.URLs.backURL;

    $scope.aircrafts = resolvedAllAircrafts;

    var userID = localStorageService.get('user_data').data.id;
    $scope.currentKey = profileDataManagement.defineKey(userID, 'Pilot', 'create');
    $scope.pilot = profileDataManagement.get(userID, 'Pilot', 'create')
    $scope.user = simpleStorage.getter('user_data').data;
    // $scope.datesRanges = $filter('dataRanges')($scope.pilot.unavailable_days_attributes);

    if ($scope.pilot.unavailable_days_attributes !== null &&
      $scope.pilot.unavailable_days_attributes !== undefined &&
      $scope.pilot.unavailable_days_attributes.length > 0) {
      $scope.datesRanges = $filter('dataRanges')($scope.pilot.unavailable_days_attributes);
    }

    $scope.pilot = sendProfileObject.cleanArrays($scope.pilot);

    $scope.submit = function () {
      $scope.pilot.profile.user_id = userID;
      Pilot.new({
        'pilot': $scope.pilot
      });
    }

    $scope.toggleGroup = function (state, variable) {
      $scope[variable] = toggler.toggle($scope[variable]);
      $timeout(function () {
        $ionicScrollDelegate.resize();
      }, 100);
    };

    $scope.$on('PilotProfileCreated', function (event, status) {
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
        $location.path('app-pilot/home');
        localStorageService.remove($scope.currentKey);
        $ionicLoading.hide();
      }, function (response) {
        Utils.showError(response);
      });

    });

    $scope.goDown = function () {
      $ionicScrollDelegate.scrollTo(0, 1000);
    }
  })
