angular.module('aom-pilot-results-controller', []);
angular.module('aom-pilot-results-controller')
  .controller('AomPilotResultsCtrl', function ($scope, dataShare, dataSelects, $stateParams, Pilot, CrewMember, localStorageService, CONFIG, $http) {

    $scope.results = dataShare.get();
    $scope.profile_type_url = $stateParams.resultType;

    if ($scope.results.length === 0) {
      $scope.showNoFound = true;
    }

    //Get search params from previous page
    $scope.search = localStorageService.get('search_data');
    $scope.fetchData = true;
    
    $scope.doSearch = function () {
      $scope.search.page = $scope.search.page + 1;
      
      var req = {
        url: CONFIG.COMPLETE_API_URL + '/pilots',
        params: $scope.search
      }
      
      if($scope.search.role !== 'pilot'){
          req.url = CONFIG.COMPLETE_API_URL + '/crew_members/';
      }
      
      $http(req).then(function (response) {
        $scope.results = $scope.results.concat(response.data)
        $scope.$broadcast('scroll.infiniteScrollComplete');
        
        if(response.data.length === 0){
          $scope.fetchData = false;
        }
      }, function () {});
    }
  })
