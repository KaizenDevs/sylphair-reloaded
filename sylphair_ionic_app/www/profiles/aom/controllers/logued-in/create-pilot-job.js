angular.module('aom-create-pilot-job-controller', []);
angular.module('aom-create-pilot-job-controller')
  .controller('AomCreatePilotJobCtrl', function (
    $scope,
    dataSelects,
    $http,
    $ionicLoading,
    $ionicPopup,
    $timeout,
    $location,
    Job,
    $rootScope,
    lodash,
    resolvedAllAircrafts,
    $translate,
    AomService
  ) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    $scope.job = {
      start_date: new Date(),
      end_date: tomorrow,
      contract_type: '',
      time_on_type: 0,
      allowanceShow: false,
      allowance: {},
      languages: {}
    }

    var dropdownAnySetter = function (collection, single, key, nested_father, set_any) {

      if (nested_father == undefined) nested_father = false
      if (set_any == undefined) set_any = false


      if (set_any) some_array.unshift({
        "name": "Any",
        key: ""
      });

      $scope.aircrafts = resolvedAllAircrafts;
      $scope.job.aircraft_id = $scope.aircrafts[0].id;

        dataSelects.get(collection).then(function (response) {
          var some_array;

          if (collection === 'aircrafts') {
            some_array = resolvedAllAircrafts;
          }

          if (collection !== 'aircrafts') {
            some_array = response.data;
          }


          if (set_any) some_array.unshift({
            "name": "Any",
            key: ""
          });

          $scope[collection] = some_array;
          if (nested_father) $scope[nested_father][single] = $scope[collection][0][key];
          if (!nested_father) $scope[single] = $scope[collection][0][key];
        });

    }

    // dropdownAnySetter(collection,single,key,nested_father,set_any(default: false))
    dropdownAnySetter('pilot_positions', 'position', 'value', 'job')
    dropdownAnySetter('contract_types', 'contract_type', 'value', 'job')
    dropdownAnySetter('aircrafts', 'aircraft_id', 'id', 'job')
    dropdownAnySetter('countries', 'country_id', 'id', 'job')

    $scope.doCreateJob = function () {
      var checkForm = AomService.jobPost($scope.job);

      if (!$scope.job.allowanceShow) $scope.job.allowance = {};
      delete $scope.job.allowanceShow;
      $scope.job.job_type = 'pilot job';

      if(checkForm.flag){
        $ionicPopup.alert({
          title: $translate.instant('error_modal_title_msg'),
          template: checkForm.msg,
          okText: $translate.instant('modal_ok_btn')
        });
      }else{
        $scope.createJob({
          job: $scope.job
        });
      }
    }

    $scope.createJob = function (job) {
      Job.new(job);
    }

  })
