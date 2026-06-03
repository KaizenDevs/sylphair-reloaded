angular.module('attendant-my-jobs-controller', []);
angular.module('attendant-my-jobs-controller')
  .controller('JobsAppliedAttendantCtrl', function ($scope, User, localStorageService, Utils, $ionicLoading, ViewJobsService, $location) {
    $ionicLoading.show();
    User.get().then(function (response) {
      $scope.jobs = response.jobs_applied;
      $ionicLoading.hide();

      var today = moment();

      angular.forEach($scope.jobs, function (value) {
        var endDate = moment(value.end_date);
        if (endDate < today) {
          value.ended = true;
        }
      });

      $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
      });

    }, function (response) {
      Utils.showError(response);
    });

    $scope.viewJob = function (id) {
      ViewJobsService.setView(true);
      $location.path('app-aom/jobs/' + id);
    }

  })
