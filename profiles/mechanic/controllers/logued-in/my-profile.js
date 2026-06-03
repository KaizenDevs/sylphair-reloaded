angular.module('mechanic-my-profile-controller', []);
angular.module('mechanic-my-profile-controller')
  .controller('mechanicMyProfileCtrl', function (
    $scope,
    toggler,
    $ionicScrollDelegate,
    $timeout,
    $filter,
    mechanicDetails,
    resolvedAllAircrafts,
    localStorageService
  ) {

    $scope.user = mechanicDetails;
    $scope.aircrafts = resolvedAllAircrafts;
    console.log($scope.user);
    var userInfo = localStorageService.get('user_data').data;
    $scope.appliedJobs = mechanicDetails.jobs_applied;

    var dates = $scope.user.crew_member.unavailable_days;

    if (dates == undefined || dates == null || dates.length == 0) {
      var validDates = false
    } else {
      validDates = true
    }

    if (validDates) $scope.unavailable_dates = $scope.user.crew_member.unavailable_days[0].dates;
    if (validDates) $scope.datesRanges = $filter('dataRanges')($scope.unavailable_dates);

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
