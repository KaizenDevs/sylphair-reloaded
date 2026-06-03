angular.module('login-controller', []);
angular.module('login-controller', [])
  .controller('LoginCtrl', function ($scope, $location, $ionicPopup, $rootScope, $ionicModal, User, Session, localStorageService, traitInitializer) {
    $scope.loginData = traitInitializer.get('user');
    Session.listener();

    $scope.doLogin = function (loginForm) {
      if (loginForm.$valid) {
        Session.new($scope.loginData);
      }
    };

    $ionicModal.fromTemplateUrl('reset-password.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
      $scope.resetPassword = {}
      $scope.resetPassword = function () {
        $scope.modal.hide();
        User.resetPassword(
          $scope.resetPassword.email
        ).then(function (response) {
          var confirmPopup = $ionicPopup.alert({
            title: Object.keys(response)[0],
            template: response[Object.keys(response)[0]]
          });
        });
      }
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

  })
