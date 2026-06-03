angular.module('finish-aom-registration-controller', []);
angular.module('finish-aom-registration-controller', [])
  .controller('finishAomRegistrationCtrl', function (
    $scope,
    $http,
    localStorageService,
    dataSelects,
    $location,
    $rootScope,
    $ionicPopup,
    CONFIG,
    $translate
  ) {

    var vm = this;
    vm.showMissAlert = false;

    $scope.countries = $rootScope.countries;
    // dataSelects.countries().then(function(response){ $scope.countries = response.data });
    // $scope.aom = {company_name: '',phone: '',adress:'',country_id: '',skype: '',website: ''};
    // $scope.aom = {company_name: 'my Company',phone: 111222333,adress:'Streeth 1441 WS',country_id: '5',skype:
    // 'miSype',website: 'www.misite.com'};
    $scope.aom = {
      company_name: '',
      phone: '',
      address: '',
      country_id: '',
      skype: '',
      website: ''
    };

    //Methods

    vm.doRegister = doRegister;

    function doRegister() {

      vm.elementsMissing = "<hr/>";
      var countMising = 0;

      // phone
      if ($scope.aom.phone === "" ||
        $scope.aom.phone === null) {
        vm.showMissAlert = true;
        vm.elementsMissing = vm.elementsMissing + $translate.instant('phone_number_label') + '<br/>';
        countMising++;
      }
      // address
      if ($scope.aom.address === "" ||
        $scope.aom.address === null) {
        vm.showMissAlert = true;
        vm.elementsMissing = vm.elementsMissing + $translate.instant('address_label') + '<br/>';
        countMising++;
      }
      // country_id
      if ($scope.aom.country_id === "" ||
        $scope.aom.country_id === null) {
        vm.showMissAlert = true;
        vm.elementsMissing = vm.elementsMissing + $translate.instant('country_label') + '<br/>';
        countMising++;
      }

      if (vm.showMissAlert && countMising > 0) {
        $ionicPopup.alert({
          title: $translate.instant('error_modal_title_msg'),
          template: $translate.instant('error_modal_template_msg') + vm.elementsMissing,
          okText: $translate.instant('modal_ok_btn')
        });
      } else {
        $scope.submit();
      }
    }

    $scope.submit = function () {
      var req = {
        method: 'POST',
        url: CONFIG.COMPLETE_API_URL + '/aircraft_owners',
        headers: {
          'Authorization': localStorageService.get('user_data').data.auth_token
        },
        data: $scope.aom
      }

      $http(req).then(function (response) {
        var req2 = {
          url: CONFIG.COMPLETE_API_URL + '/users/' + response.data.user_id
        }
        $http(req2).then(function (data) {
          localStorageService.set('user_data', data);
          $location.path('app-aom/aom-home');
        }, function (error) {
          Raven.captureMessage(error);
        });

      });

    };

  })
