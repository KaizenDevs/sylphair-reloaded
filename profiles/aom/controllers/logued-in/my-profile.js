angular.module('aom-my-profile-controller', []);
angular.module('aom-my-profile-controller')
  .controller('AomMyProfileCtrl', function (User, $scope, $window, simpleStorage, $http, $ionicPopup, localStorageService, toggler, $ionicScrollDelegate, dataSelects, $filter, $timeout, $ionicLoading, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.loadData = function () {
      $ionicLoading.show();

      User.get().then(function (response) {
        $scope.user = response;
        localStorageService.set('user_data', {
          data: response
        });
        $ionicLoading.hide();
      }, function (response) {
        Utils.showError(response);
      });
    }

    $scope.loadData();

    $scope.toggleGroup = function (state, variable) {
      $scope[variable] = toggler.toggle($scope[variable]);
      $timeout(function () {
        $ionicScrollDelegate.resize()
      }, 50);
    };

  })
