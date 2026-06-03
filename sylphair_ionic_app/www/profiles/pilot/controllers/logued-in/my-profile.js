angular.module('pilot-my-profile-controller', []);
angular.module('pilot-my-profile-controller')
  .controller('pilotMyProfileCtrl', function (
    $scope,
    toggler,
    $ionicScrollDelegate,
    $timeout,
    $filter,
    pilotDetails,
    localStorageService,
    resolvedAllAircrafts
  ) {
    var userInfo = localStorageService.get('user_data').data;
    $scope.user = pilotDetails;
    $scope.aircrafts = resolvedAllAircrafts;
    $scope.appliedJobs = userInfo.jobs_applied;
    if ($scope.user.unavailable_days !== null &&
      $scope.user.unavailable_days !== undefined &&
      $scope.user.unavailable_days.length > 0
    ) {
      $scope.unavailable_dates = $scope.user.unavailable_days[0].dates;
      $scope.datesRanges = $filter('dataRanges')($scope.unavailable_dates);
    }

    $scope.toggleGroup = function (state, variable) {
      $scope[variable] = toggler.toggle($scope[variable]);
      $timeout(function () {
        $ionicScrollDelegate.resize()
      }, 50);
    }

    $scope.goDown = function () {
      $ionicScrollDelegate.scrollTo(0, 1000);
    }

  })
