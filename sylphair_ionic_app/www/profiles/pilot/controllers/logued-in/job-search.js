angular.module('pilot-job-search-controller', []);
angular.module('pilot-job-search-controller')
  .controller('PilotJobSearchCtrl', function (
    $scope,
    dataSelects,
    Utils,
    localStorageService,
    $http,
    dataShare,
    $location,
    traitInitializer,
    $ionicLoading,
    $rootScope,
    CONFIG,
    // allAircrafts,
    resolvedAllAircrafts
  ) {
    $scope.search = traitInitializer.get('pilot_job_seach');


    role = localStorageService.get('user_data').data.role;
    switch (role) {
      case 'pilot':

        $scope.positions = $rootScope.pilot_positions;
        if ($scope.positions[0].name != "Any") $scope.positions.unshift({
          "name": "Any",
          "value": ""
        });
        $scope.search.position = $scope.positions[0].value;

        break;
      case 'flight attendant':
        $scope.positions = $rootScope.flight_attendant_position;
        if ($scope.positions[0].name != "Any") $scope.positions.unshift({
          "name": "Any",
          "value": ""
        });
        $scope.search.position = $scope.positions[0].value;
        break;
      case 'mechanic':
        $scope.positions = $rootScope.mechanic_position;
        if ($scope.positions[0].name != "Any") $scope.positions.unshift({
          "name": "Any",
          "value": ""
        });
        $scope.search.position = $scope.positions[0].value;
        break;
    }

    $scope.contract_types = $rootScope.contract_types;
    if ($scope.contract_types[0].name != "Any") $scope.contract_types.unshift({
      "name": "Any",
      "value": ""
    });
    $scope.search.contract_type = $scope.contract_types[0].value;

    // allAircrafts.get().then(function(data) {
    
      $scope.aircrafts = resolvedAllAircrafts;
      if ($scope.aircrafts.length && $scope.aircrafts[0].name != "Any") $scope.aircrafts.unshift({
        "name": "Any",
        "id": ""
      });
      $scope.search.aircraft_id = $scope.aircrafts[0].id;
    // })

    var dropdownAnySetter = function (collection, singular, key1) {
      dataSelects.get(collection).then(function (response) {
        $scope[collection] = response.data;
        $scope[collection].unshift({
          "name": "Any",
          key1: ""
        });
        $scope[singular] = $scope[collection][0][key1];

      });
    }

    dropdownAnySetter('countries', 'search.country_id', 'id')

    // dataSelects.countries().then(function(response){ $scope.countries = response.data });
    role = localStorageService.get('user_data').data.role;
    $scope.search.job_type = role + " job";
    $scope.search.page = 1;

    $scope.doSearch = function () {
      localStorageService.set('search_data', $scope.search);
      $ionicLoading.show();
      var req = {
        url: CONFIG.COMPLETE_API_URL + '/jobs',
        params: $scope.search
      }

      $http(req).then(function (response) {
        dataShare.set(response.data);

        $location.path('app-pilot/pilot-job-results');
      }, function () {});

    }
  })
