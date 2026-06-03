angular.module('aom-create-mechanic-job-controller', []);
angular.module('aom-create-mechanic-job-controller')
  .controller('AomCreateMechanicJobCtrl', function (
    $http,
    $ionicLoading,
    $ionicPopup,
    $location,
    $rootScope,
    $scope,
    $timeout,
    dataSelects,
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
      }],
      job_positions_attributes: [{position: 'airframe'}]
    }


    dataSelects.get('mechanic_position').then(function (res) {
      $rootScope.mechanic_position = res.data
      $scope.job.position = $rootScope.mechanic_position[0].value
    })

    dataSelects.get('contract_types').then(function (res) {
      $rootScope.contract_types = res.data
      $scope.contract_types = $rootScope.contract_types
      $scope.job.contract_type = $scope.contract_types[0].value
    })
    // dataSelects.get('aircrafts').then(function (res) {
    //   $rootScope.aircrafts = res.data
    //   $scope.aircrafts = $rootScope.aircrafts
    //   $scope.job.aircraft_id = $scope.aircrafts[0].id
    // })

    $scope.aircrafts = resolvedAllAircrafts;
    $scope.job.aircraft_id = $scope.aircrafts[0].id;

    dataSelects.get('countries').then(function (res) {
      $rootScope.countries = res.data
      $scope.countries = $rootScope.countries
      $scope.job.country_id = $scope.countries[0].id
    })

    $scope.language_proficiencies_attributes = $rootScope.languages;
    $scope.job_positions_attributes = [
      'airframe',
      'power plan',
      'avionic',
      'sheet metal'
    ];

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

    $scope.nestedPosition = {}
    $scope.nestedPosition.add = function () {
      $scope.job.job_positions_attributes.push({
        position: ''
      })
    }

    $scope.nestedPosition.remove = function (index) {
      if (index > -1) {
        $scope.job.job_positions_attributes.splice(index, 1)
      }
    }

    $scope.doCreateJob = function () {
      var checkForm = AomService.jobPost($scope.job);
      $scope.job.job_type = 'mechanic job';

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
