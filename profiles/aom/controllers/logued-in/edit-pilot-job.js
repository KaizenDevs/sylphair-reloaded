angular.module('aom-edit-pilot-job-controller', []);
angular.module('aom-edit-pilot-job-controller')
  .controller('AomEditPilotJobCtrl', function (
    $scope,
    $rootScope,
    traitInitializer,
    jobDetails,
    Job,
    $ionicHistory,
    resolvedAllAircrafts,
    $ionicPopup,
    $translate,
    AomService
  ) {
    
    $scope.aircrafts = resolvedAllAircrafts;
    $scope.editingJob = true;
    $scope.showCancelEdit = true;
    $scope.cancelEdit = function () {
      $ionicHistory.goBack();
    }


    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });

    jobDetails.start_date = new Date(jobDetails.start_date);
    jobDetails.end_date = new Date(jobDetails.end_date);

    for (var key in jobDetails) {
      if (key == 'allowance') {
        for (var key2 in jobDetails[key]) {
          if (key2 != 'description') jobDetails.allowance[key2] = JSON.parse(jobDetails.allowance[key2]);
        }
      }
    }

    $scope.job = jobDetails;
    if (jobDetails.allowance != null) {
      if (jobDetails.allowance.description != '' || jobDetails.allowance.housing || jobDetails.allowance.transportation || jobDetails.allowance.education || jobDetails.allowance.other) $scope.job.allowanceShow = true;
    }

    $scope.resetAllowance = function () {
      $scope.job.allowance = traitInitializer.get('pilot_allowance');
    }

    $scope.doEditJob = function () {
      var checkForm = AomService.jobPost($scope.job);

      if (!$scope.job.allowanceShow) $scope.resetAllowance();

      if(checkForm.flag){
        $ionicPopup.alert({
          title: $translate.instant('error_modal_title_msg'),
          template: checkForm.msg,
          okText: $translate.instant('modal_ok_btn')
        });
      }else{
        Job.update($scope.job);
      }
      
    }

  })
