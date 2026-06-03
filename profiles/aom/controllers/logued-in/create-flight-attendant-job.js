angular.module('aom-create-flight-attendant-job-controller', []);
angular.module('aom-create-flight-attendant-job-controller')
  .controller('AomCreateFlightAttendantJobCtrl', function (
    $scope,
    dataSelects,
    $http,
    $ionicLoading,
    $ionicPopup,
    $timeout,
    $location,
    simpleStorage,
    $rootScope,
    Job,
    $ionicScrollDelegate,
    resolvedAllAircrafts,
    $translate,
    AomService
  ) {
    $scope.job = {
      start_date: new Date(),
      crew_member_details: {},
      language_proficiencies_attributes: [{
        language_id: 12,
        level: '4'
      }]
    }


    $scope.positions = $rootScope.flight_attendant_position;
    $scope.job.position = $scope.positions[0].value;

    $scope.contract_types = $rootScope.contract_types;
    $scope.job.contract_type = $scope.contract_types[0].value;

    // $scope.aircrafts = $rootScope.aircrafts;
    $scope.aircrafts = resolvedAllAircrafts;
    $scope.job.aircraft_id = $scope.aircrafts[0].id;

    $scope.countries = $rootScope.countries;
    $scope.job.country_id = $scope.countries[0].id;

    $scope.language_proficiencies_attributes = $rootScope.languages;

    $scope.genders = [{
      name: 'Any',
      value: 'Any'
    }, {
      name: 'Male',
      value: 'M'
    }, {
      name: 'Female',
      value: 'F'
    }]
    $scope.job.crew_member_details.gender = $scope.genders[0].value;
    $scope.nestedLanguage = {}
    $scope.nestedLanguage.add = function () {
      $scope.job.language_proficiencies_attributes.push({
        language_id: '',
        level: ''
      })
    }
    $scope.nestedLanguage.remove = function (index) {
      if (index > -1) {
        $scope.job.language_proficiencies_attributes.splice(index, 1)
      }
    }

    $scope.doCreateJob = function () {
      var checkForm = AomService.jobPost($scope.job);
      $scope.job.job_type = 'flight attendant job';

      if(checkForm.flag){
        $ionicPopup.alert({
          title: $translate.instant('error_modal_title_msg'),
          template: checkForm.msg,
          okText: $translate.instant('modal_ok_btn')
        });
      }else{
        Job.new({
          job: $scope.job
        });
      }
    }

    $scope.goDown = function () {
      $ionicScrollDelegate.scrollTo(0, 1000);
    }

  })
