angular.module('create-pilot-flight-hours-controller', []);
angular.module('create-pilot-flight-hours-controller')
  .controller('CreatePilotFlightHoursCtrl', function ($scope, simpleSave, localStorageService, nestedObjectHandler, $rootScope, profileDataManagement, $ionicHistory, EditProfileRouter) {
    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url);
    $scope.backURL = $scope.URLs.backURL;
    $scope.nextURL = $scope.URLs.nextURL;
    var userID = localStorageService.get('user_data').data.id;
    $scope.currentKey = profileDataManagement.defineKey(userID, 'Pilot', 'create');
    $scope.createPilot = profileDataManagement.get(userID, 'Pilot', 'create')
    $scope.simpleSave = simpleSave;
    $scope.nestedObjectHandler = nestedObjectHandler;
    $rootScope.$on('simpleStorageUpdated', function (event, updatedObject) {
      $scope.createPilot = updatedObject;
    });

  })
