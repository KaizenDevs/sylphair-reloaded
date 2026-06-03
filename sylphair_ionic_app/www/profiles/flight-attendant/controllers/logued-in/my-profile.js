angular.module('flight-attendant-my-profile-controller', []);
angular.module('flight-attendant-my-profile-controller')
  .controller('FlightAttendatMyProfileCtrl', function ($scope, $filter, $window, simpleStorage, $http, $ionicPopup, toggler, localStorageService, $ionicScrollDelegate, $timeout, crewMembersDetails) {
    $scope.user = {}
    var userInfo = localStorageService.get('user_data').data;
    $scope.appliedJobs = userInfo.jobs_applied;
    $scope.user = crewMembersDetails;

    var validDates;

    var dates = $scope.user.unavailable_days;
    if (dates == undefined || dates == null || dates.length == 0) {
      validDates = false
    } else {
      validDates = true
    }

    if (validDates) $scope.unavailable_dates = $scope.user.unavailable_days[0].dates;
    if (validDates) $scope.datesRanges = $filter('dataRanges')($scope.unavailable_dates);


    $scope.toggleGroup = function (state, variable) {
      $scope[variable] = toggler.toggle($scope[variable]);
      $timeout(function () {
        $ionicScrollDelegate.resize()
      }, 200);
    };

    $scope.goDown = function () {
      $ionicScrollDelegate.scrollTo(0, 1000);
    }

  })
