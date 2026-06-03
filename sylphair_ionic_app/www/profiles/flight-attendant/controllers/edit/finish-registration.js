angular.module('edit-flight-attendant-finish-registration-controller', []);
angular.module('edit-flight-attendant-finish-registration-controller')
  .controller('flightAttendantEditFinishRegistrationCtrl', function (
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
    User,
    Utils,
    $ionicHistory,
    EditProfileRouter,
    CrewMember
  ) {

    // var userID = localStorageService.get('user_data').data.id;
    // $scope.currentKey = profileDataManagement.defineKey( userID , 'Pilot', 'edit');
    // $scope.pilot = profileDataManagement.get( userID, 'Pilot', 'edit')

    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url);
    $scope.backURL = $scope.URLs.backURL;
    $scope.nextURL = $scope.URLs.nextURL;

    var userID = localStorageService.get('user_data').data.id;
    $scope.currentKey = profileDataManagement.defineKey(userID, 'FlightAttendant', 'edit');
    $scope.FlightAttendant = simpleStorage.getter($scope.currentKey);
    $scope.showCancelEdit = true;
    $scope.cancelEdit = function () {
      localStorageService.remove($scope.currentKey)
      $location.path('app-flight-attendant/my-profile/' + localStorageService.get('user_data').data.crew_member.id)
    }

    $scope.user = simpleStorage.getter('user_data').data;
    if ($scope.FlightAttendant.unavailable_days_attributes !=
      null && $scope.FlightAttendant.unavailable_days_attributes !==
      undefined && $scope.FlightAttendant.unavailable_days_attributes.length > 0) $scope.datesRanges = $filter('dataRanges')($scope.FlightAttendant.unavailable_days_attributes);
    $scope.FlightAttendant = sendProfileObject.cleanArrays($scope.FlightAttendant);

    $scope.submit = function () {
      $scope.FlightAttendant.profile.user_id = userID;
      if ($scope.FlightAttendant.unavailable_days_attributes != null) {
        if (typeof $scope.FlightAttendant.unavailable_days_id !== 'undefined' && $scope.FlightAttendant.unavailable_days_attributes.length == 0) {
          $scope.FlightAttendant.unavailable_days_attributes.push({
            _destroy: true,
            id: $scope.FlightAttendant.unavailable_days_id
          })
        }
      }
      delete $scope.FlightAttendant.unavailable_days_id;
      // localStorageService.set('temp', {'crew_member': $scope.FlightAttendant })
      CrewMember.update({
        'crew_member': $scope.FlightAttendant
      });

    }

    $scope.toggleGroup = function (state, variable) {
      $scope[variable] = toggler.toggle($scope[variable]);
      $timeout(function () {
        $ionicScrollDelegate.resize();
      }, 100);
    };

    $rootScope.$on('CrewMemberProfileEdited', function (event, status) {
      User.get().then(function (response) {
        $scope.user = response;
        var userId = $scope.FlightAttendant.id;
        localStorageService.set('user_data', {
          data: response
        });
        $location.path('app-flight-attendant/my-profile/' + userId);
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
