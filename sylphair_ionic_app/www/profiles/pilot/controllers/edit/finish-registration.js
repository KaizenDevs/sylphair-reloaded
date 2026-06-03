angular.module('edit-pilot-finish-registration-controller', [])
angular.module('edit-pilot-finish-registration-controller')
  .controller('pilotEditFinishRegistrationCtrl', function (
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
    Pilot,
    User,
    Utils,
    $ionicHistory,
    EditProfileRouter,
    resolvedAllAircrafts
  ) {
    // var userID = localStorageService.get('user_data').data.id;
    // $scope.currentKey = profileDataManagement.defineKey(userID , 'Pilot', 'edit');
    // $scope.pilot = profileDataManagement.get(userID, 'Pilot', 'edit')

    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url)
    $scope.backURL = $scope.URLs.backURL
    $scope.nextURL = $scope.URLs.nextURL

    $scope.aircrafts = resolvedAllAircrafts

    var userID = localStorageService.get('user_data').data.id
    $scope.currentKey = profileDataManagement.defineKey(userID, 'Pilot', 'edit')

    $scope.pilot = simpleStorage.getter($scope.currentKey)
    $scope.showCancelEdit = true
    $scope.cancelEdit = function () {
      localStorageService.remove($scope.currentKey)
      $location.path('app-pilot/pilot-my-profile/' + localStorageService.get('user_data').data.pilot.id)
    }

    $scope.user = simpleStorage.getter('user_data').data
    // $scope.datesRanges = $filter('dataRanges')($scope.pilot.unavailable_days_attributes)

    if ($scope.pilot.unavailable_days_attributes !== null &&
      $scope.pilot.unavailable_days_attributes !== undefined &&
      $scope.pilot.unavailable_days_attributes.length > 0) {
      $scope.datesRanges = $filter('dataRanges')($scope.pilot.unavailable_days_attributes)
    }

    $scope.pilot = sendProfileObject.cleanArrays($scope.pilot)
    $scope.submit = function () {
      $scope.pilot.profile.user_id = userID
      Pilot.update({
        'pilot': $scope.pilot
      })
    }

    $scope.toggleGroup = function (state, variable) {
      $scope[variable] = toggler.toggle($scope[variable])
      $timeout(function () {
        $ionicScrollDelegate.resize()
      }, 100)
    }

    $rootScope.$on('PilotProfileEdited', function () {
      User.get().then(function (response) {
        $scope.user = response
        localStorageService.set('user_data', {
          data: response
        })
        $location.path('app-pilot/pilot-my-profile/' + localStorageService.get('user_data').data.pilot.id)
        localStorageService.remove($scope.currentKey)
        $ionicLoading.hide()
      }, function (response) {
        Utils.showError(response)
      })
    })

    $scope.goDown = function () {
      $ionicScrollDelegate.scrollTo(0, 1000);
    }
  })
