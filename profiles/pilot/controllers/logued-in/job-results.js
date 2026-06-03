angular.module('pilot-job-results-controller', []);
angular.module('pilot-job-results-controller')
  .controller('jobResultsCtrl', function (
    $scope,
    dataShare,
    dataSelects,
    localStorageService,
    $location,
    SearchJobRoleRouter,
    resolvedAllAircrafts,
    CONFIG,
    $http
  ) {

    $scope.aircrafts = resolvedAllAircrafts;
    $scope.resultsgoBack = function () {
      SearchJobRoleRouter.currentUser();
    }

    $scope.results = dataShare.get();

    if ($scope.results.length === 0) {
      $scope.showNoFound = true;
    }

    //Get search params from previous page
    $scope.search = localStorageService.get('search_data');
    $scope.fetchData = true;
    
    $scope.doSearch = function () {
      $scope.search.page = $scope.search.page + 1;
      var req = {
        url: CONFIG.COMPLETE_API_URL + '/jobs',
        params: $scope.search
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
