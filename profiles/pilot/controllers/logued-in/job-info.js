angular.module('pilot-job-info-controller', []);
angular.module('pilot-job-info-controller')
  .controller('jobInfoCtrl', function (
    $scope,
    $filter,
    $window,
    $http,
    $ionicPopup,
    jobDetails,
    $state,
    $stateParams,
    localStorageService,
    Utils,
    SearchJobRoleRouter,
    $location,
    ViewJobsService,
    CONFIG,
    resolvedAllAircrafts,
    $rootScope,
    $translate
  ) {

    $scope.aircrafts = resolvedAllAircrafts;
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });

    // Cheking if the job has been applied
    $scope.alReadyApplied = false;
    var jobsApplied = localStorageService.get('user_data').data.jobs_applied;
    console.log('jobs', jobsApplied);
    angular.forEach(jobsApplied, function (value) {
      if (value.id === jobDetails.id) {
        $scope.alReadyApplied = true;
      }
    });

    $scope.role = localStorageService.get('user_data').data.role;
    $scope.view = ViewJobsService.getView();
    $scope.showApplyButton = false;
    $scope.showEditButton = false;
    if ($scope.role == 'flight attendant' || $scope.role == 'pilot' || $scope.role == 'mechanic') {
      $scope.showApplyButton = true;
    }
    if ($scope.role == 'aircraft owner') {
      $scope.showEditButton = true;
    }

    $scope.job = jobDetails;

    // $scope.checkForAllowance = function(){
    //     if (jobDetails.allowance != null){
    //       if (jobDetails.allowance.description != '' || jobDetails.allowance.housing == 'true' || jobDetails.allowance.transportation == 'true' || jobDetails.allowance.education == 'true' || jobDetails.allowance.other == 'true')
    //       {$scope.job.allowanceShow = true}
    //       else {
    //       $scope.job.allowanceShow = false;
    //       }
    //     }
    //   }
    //
    //   $scope.checkForAllowance();
    console.log($scope.job);
    switch ($scope.job.job_type) {
      case 'pilot job':
        $scope.job_type_path = 'app-aom/edit-pilot-job/' + $scope.job.id;
        $scope.role_url = 'pilot';
        break;
      case 'mechanic job':
        $scope.job_type_path = 'app-aom/edit-mechanic-job/' + $scope.job.id;
        $scope.role_url = 'flight-attendant';
        break;
      case 'flight attendant job':
        $scope.job_type_path = 'app-aom/edit-flight-attendant-job/' + $scope.job.id;
        $scope.role_url = 'flight-attendant';
        break;
    }

    $scope.goToEdit = function () {
      $location.path($scope.job_type_path);
    }

    $scope.apply = function () {
      var req = {
        url: CONFIG.COMPLETE_API_URL + '/jobs/' + $stateParams.jobId + "/apply"
      }
      $http(req).then(function (response) {
          $rootScope.$emit('GetUser');
          $scope.showAlert();
        }, function (response) {
          Utils.showError(response);
      });
    }

    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('thank_you_label'),
        template: $translate.instant('job_applied_msg'),
        okText: $translate.instant('modal_ok_btn')
      });

      alertPopup.then(function (res) {
        SearchJobRoleRouter.currentUser();
      });
    };

  })
