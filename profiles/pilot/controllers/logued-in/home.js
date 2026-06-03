angular.module('pilot-home-controller', [])
angular.module('pilot-home-controller')
  .controller('pilotHomeCtrl',
    function ($scope, localStorageService) {
      $scope.pilotId = localStorageService.get('user_data').data.pilot.id
    })
