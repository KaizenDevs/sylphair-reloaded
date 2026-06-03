angular.module('edit-flight-attendant-profile-controller', []);
angular.module('edit-flight-attendant-profile-controller')
  .controller('EditFlightAttendantCtrl', function (
    $scope,
    simpleStorage,
    simpleSave,
    localStorageService,
    sendProfileObject,
    profileDataManagement,
    nestedObjectHandler,
    $rootScope,
    $http,
    CONFIG,
    Utils,
    $ionicHistory,
    EditProfileRouter,
    $location,
    $ionicLoading,
    $ionicPopup,
    AttendantService,
    $ionicScrollDelegate
  ) {

    var vm = this;
    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url);
    $scope.backURL = $scope.URLs.backURL;
    $scope.nextURL = $scope.URLs.nextURL;

    var userID = localStorageService.get('user_data').data.id;
    $scope.currentKey = profileDataManagement.defineKey(userID, 'FlightAttendant', 'edit');
    $scope.createFlightAttendant = simpleStorage.getter($scope.currentKey);
    $scope.showCancelEdit = true;
    $scope.cancelEdit = function () {
      localStorageService.remove($scope.currentKey)
      $location.path('app-flight-attendant/my-profile/' + localStorageService.get('user_data').data.crew_member.id)
    }
    if ($scope.createFlightAttendant == "") {
      $ionicLoading.show();
      $http({
        url: CONFIG.COMPLETE_API_URL + '/crew_members/edit_attributes'
      }).then(function (response) {
        $scope.createFlightAttendant = response.data;
        $scope.createFlightAttendant = sendProfileObject.addArrays($scope.createFlightAttendant);
        localStorageService.set($scope.currentKey, $scope.createFlightAttendant);
        $ionicLoading.hide();
      }, function (response) {
        Utils.showError(response);
      });
    }


    $scope.simpleSave = simpleSave;
    $scope.nestedObjectHandler = nestedObjectHandler;
    $rootScope.$on('simpleStorageUpdated', function (event, updatedObject) {
      $scope.createFlightAttendant = updatedObject;
    });


    $scope.limitDate = function () {
      var monthsInTheFuture = 24; //or whatever offset
      var CurrentDate = new Date();
      $scope.limitDate = new Date(CurrentDate.setMonth(CurrentDate.getMonth() + monthsInTheFuture));
    }

    $scope.datepickerObject = {

      headerClass: 'royal-bg light',
      btnsIsNative: true,

      btnOk: 'OK',
      btnOkClass: 'button-clear cal-green',

      btnCancel: 'CLOSE',
      btnCancelClass: 'button-clear button-dark',
      templateType: 'selected',
      //btnTodayShow: true,
      btnToday: 'Today',
      btnTodayClass: 'button-clear button-dark',

      btnClearShow: false,
      btnClear: 'Clear',
      btnClearClass: 'button-clear button-dark',

      selectType: 'MULTI', // SINGLE | PERIOD | MULTI

      tglSelectByWeekShow: true, // true | false (default)
      tglSelectByWeek: 'By week',
      isSelectByWeek: false, // true (default) | false
      selectByWeekMode: 'NORMAL', // INVERSION (default), NORMAL
      tglSelectByWeekClass: 'toggle-positive',
      titleSelectByWeekClass: 'positive positive-border',
      accessType: 'WRITE', // READ | WRITE
      conflictSelectedDisabled: 'DISABLED', // SELECTED | DISABLED
      closeOnSelect: false,
      mondayFirst: true,
      selectedDates: $scope.unavailable_days_attributes,
      fromDate: new Date(),
      toDate: $scope.limitDate,
      callback: function (dates) {
        var temp = [];
        for (var i = 0; i < dates.length; i++) {
          temp.push({
            date: dates[i]
          });
        }

        $scope[$scope.currentKey].unavailable_days_attributes = temp;
        simpleStorage.setter($scope.currentKey, $scope[$scope.currentKey]);
        $scope.readUnavailableDays();
      }
    };

    $scope.readUnavailableDays = function () {
      $scope[$scope.currentKey] = simpleStorage.getter($scope.currentKey);
      $scope.unavailable_days_attributes = [];
      var unavailable_days_attributes = $scope[$scope.currentKey].unavailable_days_attributes;
      for (var key in unavailable_days_attributes) {
        if (unavailable_days_attributes.hasOwnProperty(key)) {
          var value = unavailable_days_attributes[key];
          $scope.unavailable_days_attributes.push(new Date(value.date));
        }
      }
      // this is to update datepickerObject.unavailable_days_attributes scope
      $scope.datepickerObject.selectedDates = $scope.unavailable_days_attributes;
      return $scope.unavailable_days_attributes;
    }

    $scope.readUnavailableDays();

    $scope.clearDates = function () {

      $scope[$scope.currentKey].unavailable_days_attributes = [];
      simpleStorage.setter($scope.currentKey, $scope[$scope.currentKey]);
      $scope.unavailable_days_attributes = [];
      $scope.readUnavailableDays();
    }

    // Methods

    vm.validateProfile = validateProfile;
    vm.validatePassport = validatePassport;
    vm.validateVisa = validateVisa;
    vm.validateInternational = validateInternational;
    vm.validateExperience = validateExperience;
    vm.validateAvailability = validateAvailability;

    function validateProfile() {
      var checkForm = AttendantService.profile($scope.createFlightAttendant);
      if (checkForm.flag) {
        $ionicPopup.alert({
          title: 'Something is missing!',
          template: checkForm.msg
        });
      } else {
        var url = $scope.nextURL.split('#');
        $location.path(url[1]);
      }
    }

    function validatePassport() {
      var checkForm = AttendantService.passport($scope.createFlightAttendant);
      if (checkForm.flag) {
        $ionicPopup.alert({
          title: 'Something is missing!',
          template: checkForm.msg
        });
      } else {
        var url = $scope.nextURL.split('#');
        $location.path(url[1]);
      }
    }

    function validateVisa() {
      var checkForm = AttendantService.visa($scope.createFlightAttendant);
      if (checkForm.flag) {
        $ionicPopup.alert({
          title: 'Something is missing!',
          template: checkForm.msg
        });
      } else {
        var url = $scope.nextURL.split('#');
        $location.path(url[1]);
      }
    }

    function validateInternational() {
      var checkForm = AttendantService.international($scope.createFlightAttendant);
      if (checkForm.flag) {
        $ionicPopup.alert({
          title: 'Something is missing!',
          template: checkForm.msg
        });
      } else {
        var url = $scope.nextURL.split('#');
        $location.path(url[1]);
      }
    }

    function validateExperience() {
      var checkForm = AttendantService.professional($scope.createFlightAttendant);
      var url = $scope.nextURL.split('#');
      $location.path(url[1]);
    }

    function validateAvailability() {
      var checkForm = AttendantService.availability($scope.createFlightAttendant);
      if (checkForm.flag) {
        $ionicPopup.alert({
          title: 'Something is missing!',
          template: checkForm.msg
        });
      } else {
        var url = $scope.nextURL.split('#');
        $location.path(url[1]);
      }
    }

    $scope.goDown = function () {
      $ionicScrollDelegate.scrollTo(0, 1000);
    }


  })
