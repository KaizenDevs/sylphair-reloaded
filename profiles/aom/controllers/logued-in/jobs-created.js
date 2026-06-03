angular.module('jobs-created-controller', []);
angular.module('jobs-created-controller')
  .controller('JobsCreatedCtrl', function (
    $scope, User, localStorageService, Utils, $ionicLoading, resolvedAllAircrafts
  ) {
    $scope.aircrafts = resolvedAllAircrafts;
    $ionicLoading.show();
    User.get().then(function (response) {
      // localStorageService.set('user_data', {data: response});
      $scope.jobs = response.aircraft_owner.jobs;
      $ionicLoading.hide();

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

      if ($scope.jobs.length === 0) {
        $scope.showNoFound = true;
      }

    }, function (response) {
      Utils.showError(response);
    });
  })
