angular.module('create-mechanic-professional-experience-controller', []);
angular.module('create-mechanic-professional-experience-controller')
  .controller('CreateMechanicProfessionalExperienceCtrl', function (
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
    MechanicService,
    resolvedAllAircrafts,
    $translate
  ) {

    var vm = this;

    vm.showMissAlert = false;

    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url);
    $scope.backURL = $scope.URLs.backURL;
    $scope.nextURL = $scope.URLs.nextURL;
    $scope.aircrafts = resolvedAllAircrafts;

    var userID = localStorageService.get('user_data').data.id;
    $scope.currentKey = profileDataManagement.defineKey(userID, 'Mechanic', 'create');
    $scope.createMechanic = profileDataManagement.get(userID, 'Mechanic', 'create')
    $scope.simpleSave = simpleSave;
    $scope.nestedObjectHandler = nestedObjectHandler;

    $rootScope.$on('simpleStorageUpdated', function (event, updatedObject) {
      $scope.createMechanic = updatedObject;
    });

    // dataSelects.get('aircrafts').then(function (response) {
    //   $scope.aircrafts = response.data;
    // });

    //Methods

    vm.validateExperience = validateExperience;

    function validateExperience() {
      var checkForm = MechanicService.professional($scope.createMechanic);
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
