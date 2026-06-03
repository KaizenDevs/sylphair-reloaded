angular.module('create-mechanic-unavailability-controller', []);
angular.module('create-mechanic-unavailability-controller', [])
  .controller('CreateMechanicUnavailabilityCtrl', function (
    $scope,
    traitInitializer,
    simpleStorage,
    localStorageService,
    nestedObjectHandler,
    simpleSave,
    $rootScope,
    profileDataManagement,
    $ionicHistory,
    EditProfileRouter
  ) {


    // $scope.createMechanic = simpleStorage.getter('createMechanic');
    // $scope.unavailable_days_attributes = [];
    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url);
    $scope.backURL = $scope.URLs.backURL;
    $scope.nextURL = $scope.URLs.nextURL;
    var userID = localStorageService.get('user_data').data.id;
    $scope.currentKey = profileDataManagement.defineKey(userID, 'Mechanic', 'create');
    $scope.createMechanic = profileDataManagement.get(userID, 'Mechanic', 'create')

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
  })
