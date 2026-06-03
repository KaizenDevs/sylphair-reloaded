angular.module('aom-edit-mechanic-job-controller', []);
angular.module('aom-edit-mechanic-job-controller')
  .controller('AomEditMechanicJobCtrl', function (
    $scope,
    $rootScope,
    $ionicHistory,
    traitInitializer,
    jobDetails,
    Job,
    resolvedAllAircrafts,
    $ionicPopup,
    $translate,
    AomService
  ) {

    $scope.aircrafts = resolvedAllAircrafts;
    jobDetails.start_date = new Date(jobDetails.start_date);
    jobDetails.end_date = new Date(jobDetails.end_date);
    $scope.job = jobDetails;
    $scope.job.job_positions_attributes = jobDetails.job_positions
    $scope.job_positions_attributes = [
      'airframe',
      'power plan',
      'avionic',
      'sheet metal'
    ];

    $scope.editingJob = true;
    $scope.showCancelEdit = true;
    $scope.cancelEdit = function () {
      $ionicHistory.goBack();
    }

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });

    $scope.nestedLanguage = {}
    $scope.delete_languages = []

    $scope.nestedLanguage.add = function () {
      $scope.job.language_proficiencies_attributes.push({
        language_id: '',
        level: ''
      })
    }

    $scope.nestedLanguage.remove = function (index) {

      if (index > -1) {
        if ($scope.job.language_proficiencies_attributes[index].id != undefined) {
          $scope.job.language_proficiencies_attributes[index]._destroy = '1';
          $scope.delete_languages.push($scope.job.language_proficiencies_attributes[index]);
        }
        $scope.job.language_proficiencies_attributes.splice(index, 1)

      }
    }

    $scope.nestedPosition = {}
    $scope.delete_positions = []

    $scope.nestedPosition.add = function () {
      $scope.job.job_positions_attributes.push({
        position: ''
      })
    }

    $scope.nestedPosition.remove = function (index) {

      if (index > -1) {
        if ($scope.job.job_positions_attributes[index].id != undefined) {
          $scope.job.job_positions_attributes[index]._destroy = '1';
          $scope.delete_positions.push($scope.job.job_positions_attributes[index]);
        }
        $scope.job.job_positions_attributes.splice(index, 1)
      }
    }

    $scope.doEditJob = function () {
      var checkForm = AomService.jobPost($scope.job);
      $scope.job.allowance = {};
      $scope.job.language_proficiencies_attributes = $scope.job.language_proficiencies_attributes.concat($scope.delete_languages);
      $scope.job.job_positions_attributes = $scope.job.job_positions_attributes.concat($scope.delete_positions);
      
      if(checkForm.flag){
        $ionicPopup.alert({
          title: $translate.instant('error_modal_title_msg'),
          template: checkForm.msg,
          okText: $translate.instant('modal_ok_btn')
        });
      }else{
        Job.update({
          id: $scope.job.id,
          job: $scope.job
        })
      }
    }

  })
