angular.module('visa-controller', []);
angular.module('visa-controller')
  .controller('visaCtrl', function (
    $scope,
    simpleSave,
    localStorageService,
    nestedObjectHandler,
    $rootScope,
    profileDataManagement,
    $ionicHistory,
    EditProfileRouter,
    $ionicPopup,
    $location,
    PilotService,
    $translate
  ) {

    var vm = this;
    vm.showMissAlert = false;

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

    // Methods

    // vm.validateVisa = validateVisa;
    //
    // function validateVisa() {
    //   var checkForm = PilotService.visa($scope.createPilot);
    //   var url = $scope.nextURL.split('#');
    //   $location.path(url[1]);
    // }

    vm.validateVisa = validateVisa;

    function validateVisa() {
      var checkForm = PilotService.visa($scope.createPilot);
      if (checkForm.flag) {
        $ionicPopup.alert({
          title: $translate.instant('error_modal_title_msg'),
          template: checkForm.msg,
          okText: $translate.instant('modal_ok_btn')
        });
      } else {
        var url = $scope.nextURL.split('#');
        $location.path(url[1]);
      }
    }

  })
