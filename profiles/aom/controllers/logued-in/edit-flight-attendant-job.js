angular.module('aom-edit-flight-attendant-job-controller', []);
angular.module('aom-edit-flight-attendant-job-controller')
  .controller('AomEditFlightAttendantJobCtrl', function (
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
    jobDetails.start_date = new Date(jobDetails.start_date);
    jobDetails.end_date = new Date(jobDetails.end_date);
    $scope.job = jobDetails;
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

    $scope.doEditJob = function () {
      var checkForm = AomService.jobPost($scope.job);
      $scope.job.language_proficiencies_attributes = $scope.job.language_proficiencies_attributes.concat($scope.delete_languages);
      $scope.job.allowance = {};

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
