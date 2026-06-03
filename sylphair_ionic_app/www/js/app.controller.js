angular.module('sylphairApp.controller', [])
angular.module('sylphairApp.controller', [])
  .controller('AppCtrl', function ($scope, $rootScope, localStorageService, Session, APP_INFO, $location) {
    $scope.user = localStorageService.get('user_data').data
    $scope.app_version = APP_INFO.VERSION

    var url = $location.path();

    if (localStorageService.get('user_data') != "" && url === "/start") {
      var userInfo = localStorageService.get('user_data').data;
      var userToken = userInfo.auth_token;

      if (userToken != null || userToken != undefined) {
        // mechanic -- and verify is the additional info is complete
        if (userInfo.role === "mechanic" && userInfo.finished_registration) {
          // app-mechanic/home
          $location.path('/app-mechanic/home');
        } else if (userInfo.role === "mechanic" && !userInfo.finished_registration) {
          // app-forms/create-mechanic-profile
          $location.path('/app-forms/create-mechanic-profile');
        }

        // aircraft owner -- and verify is the additional info is complete
        if (userInfo.role === "aircraft owner" && userInfo.finished_registration) {
          // app-aom/aom-home
          $location.path('/app-aom/aom-home');
        } else if (userInfo.role === "aircraft owner" && !userInfo.finished_registration) {
          // app-forms/create-aom
          $location.path('/app-forms/create-aom');
        }

        // flight attendant -- and verify is the additional info is complete
        if (userInfo.role === "flight attendant" && userInfo.finished_registration) {
          // app-flight-attendant/home
          $location.path('/app-flight-attendant/home');
        } else if (userInfo.role === "flight attendant" && !userInfo.finished_registration) {
          // app-forms/create-flight-attendant-profile
          $location.path('/app-forms/create-flight-attendant-profile');
        }

        // pilot -- and verify is the additional info is complete
        if (userInfo.role === "pilot" && userInfo.finished_registration) {
          // app-pilot/home
          $location.path('/app-pilot/home');
        } else if (userInfo.role === "pilot" && !userInfo.finished_registration) {
          // app-forms/create-pilot-profile
          $location.path('/app-forms/create-pilot-profile');
        }
      }
    }

    function userData() {
      if (localStorageService.get('user_data').data != undefined) {
        try {
          $scope.role = localStorageService.get('user_data').data.role
          $rootScope.$emit('UpdateMessages')
          if ($scope.user.role === 'pilot' && $scope.user.finished_registration) {
            $scope.pilotId = localStorageService.get('user_data').data.pilot.id
            var pilotInfo = localStorageService.get('user_data').data;
            $scope.appliedJobs = pilotInfo.jobs_applied;
          }
          if ($scope.user.role === 'mechanic' && $scope.user.finished_registration) {
            $scope.CrewMemberId = localStorageService.get('user_data').data.crew_member.id
            var mechanicInfo = localStorageService.get('user_data').data;
            $scope.appliedJobs = mechanicInfo.jobs_applied;
          }
          if ($scope.user.role === 'flight attendant' && $scope.user.finished_registration) {
            $scope.CrewMemberId = localStorageService.get('user_data').data.crew_member.id
            var attendantInfo = localStorageService.get('user_data').data;
            $scope.appliedJobs = attendantInfo.jobs_applied;
          }
          if ($scope.user.role === 'aircraft owner' && $scope.user.finished_registration) {
            var ownerInfo = localStorageService.get('user_data').data;
            $scope.user = ownerInfo;
            $scope.postedJobs = ownerInfo.aircraft_owner.jobs.length;
          }
        } catch (err) {
          Raven.captureMessage(err);
        }
      }
    }

    userData();

    $scope.menu = function () {
      userData();
    }

    $scope.toProfile = function () {
      if ($scope.user.role === 'pilot') {
        $location.path('/app-pilot/pilot-my-profile/' + $scope.pilotId);
      }
      if ($scope.user.role === 'mechanic') {
        $location.path('/app-mechanic/my-profile/' + $scope.CrewMemberId);
      }
      if ($scope.user.role === 'flight attendant') {
        $location.path('/app-flight-attendant/my-profile/' + $scope.CrewMemberId);
      }
    }

    $scope.logout = function () {
      Session.delete(localStorageService.get('user_data').data.auth_token);
    }
  })
