angular.module('mechanic-home-controller', [])
angular.module('mechanic-home-controller')
.controller('MechanicHomeCtrl',
function ($scope, localStorageService) {
  $scope.CrewMemberId = localStorageService.get('user_data').data.id
})
