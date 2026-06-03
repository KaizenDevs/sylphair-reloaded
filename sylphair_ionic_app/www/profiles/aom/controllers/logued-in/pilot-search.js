angular.module('aom-pilot-search-controller', []);
angular.module('aom-pilot-search-controller')
  .controller('AomPilotSearchCtrl', function (
    $http,
    $ionicLoading,
    $location,
    $rootScope,
    $scope,
    $stateParams,
    CrewMember,
    dataSelects,
    dataShare,
    Pilot,
    traitInitializer,
    resolvedAllAircrafts,
    $translate,
    localStorageService
  ) {

    var profile_search = $stateParams.type_of_provider;

    $scope.SetPilotSearch = function () {
      // $scope.search = traitInitializer.get('aom_pilot_search');
      // $scope.positions = $rootScope.pilot_positions;
      // if ($scope.positions[0].name != "Any") $scope.positions.unshift({"name":"Any", "value":""});
      // $scope.doSearch = function(){ Pilot.query($scope.search)}
      $scope.provider = 'pilot';
      $scope.search = traitInitializer.get('aom_pilot_search');
      $scope.positions = $rootScope.pilot_positions;
      $scope.search.role = "pilot";
      
      if ($scope.positions[0].name != "Any") $scope.positions.unshift({
        "name": "Any",
        "value": ""
      });
      $scope.doSearch = function () {
        $scope.search.page = 1;
        localStorageService.set('search_data', $scope.search);
        Pilot.query($scope.search)
      };
    }

    $scope.SetFlightAttendantSearch = function () {
      $scope.provider = 'flight attendant';
      $scope.search = traitInitializer.get('aom_pilot_search');
      $scope.search.role = "flight attendant";
      $scope.positions = $rootScope.flight_attendant_position;
      if ($scope.positions[0].name != "Any") $scope.positions.unshift({
        "name": "Any",
        "value": ""
      });
      $scope.doSearch = function () {
        $scope.search.page = 1;
        localStorageService.set('search_data', $scope.search);
        CrewMember.query($scope.search)
      }
    }

    $scope.selectedPositions = function(){
      var positions = []
      if($scope.mechanicPositions.airframe){
        positions.push('airframe')
      }
      if($scope.mechanicPositions.power_plan){
        positions.push('power plan')
      }
      if($scope.mechanicPositions.avionic){
        positions.push('avionic')
      }
      if($scope.mechanicPositions.sheet_metal){
        positions.push('sheet metal')
      }

      if (positions.length === 0) {
        return ['airframe', 'power plan', 'avionic', 'sheet metal'];
      }
      return positions;
    }

    $scope.SetMechanicSearch = function () {
      $scope.mechanicPositions = {
        airframe: false,
        power_plan: false,
        avionic: false,
        sheet_metal: false
      };
      $scope.provider = 'mechanic';
      $scope.search = traitInitializer.get('aom_pilot_search');
      $scope.search.role = "mechanic";
      $scope.positions = $rootScope.mechanic_position;
      if ($scope.positions[0].name != "Any") $scope.positions.unshift({
        "name": "Any",
        "value": ""
      });
      $scope.doSearch = function () {
        $scope.search.position = [$scope.selectedPositions()]
        $scope.search.page = 1;
        localStorageService.set('search_data', $scope.search);
        CrewMember.query($scope.search)
      }
    }

    $scope.aircrafts = resolvedAllAircrafts;
    if ($scope.aircrafts.length && $scope.aircrafts[0].name != "Any") $scope.aircrafts.unshift({
      "name": "Any",
      "id": ""
    });


    $scope.countries = $rootScope.countries;
    if ($scope.countries[0].name != "Any") $scope.countries.unshift({
      "name": "Any",
      "id": ""
    });


    switch (profile_search) {
      case 'pilot':
        $scope.SetPilotSearch();
        $scope.viewTitle = 'search_pilots_label';
        break;
      case 'flight-attendant':
        $scope.SetFlightAttendantSearch();
        $scope.viewTitle = 'search_flight_attendants_label';
        break;
      case 'mechanic':
        $scope.viewTitle = 'search_mechanics_label';
        $scope.SetMechanicSearch();
        break;
    }

  })
