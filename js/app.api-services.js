angular.module('sylphairApp.api-services', [])

  .factory('UserSession', function ($resource, CONFIG) {
    return $resource(CONFIG.COMPLETE_API_URL + '/sessions/:id')
  })

  .factory('UserCreate', function ($resource, CONFIG) {
    return $resource(CONFIG.COMPLETE_API_URL + '/users/:id', {}, {})
  })

  .factory('User', function ($q, $http, localStorageService, CONFIG) {
    return {
      get: function (userId) {
        var deffered = $q.defer()
        $http({
            url: CONFIG.COMPLETE_API_URL + '/users/' + userId
          })
          .success(function (d) {
            deffered.resolve(d)
          })
        return deffered.promise
      },
      resetPassword: function (email) {
        var deffered = $q.defer()
        $http({
            url: CONFIG.COMPLETE_API_URL + '/users/reset_password?email=' + email
          })
          .success(function (d) {
            deffered.resolve(d)
          })
        return deffered.promise
      }
    }
  })

  .factory('Job', function (
    $http, $q, localStorageService, $ionicLoading, $ionicPopup, $rootScope, CONFIG, $translate
  ) {
    return {
      get: function (jobId) {
        var deffered = $q.defer()
        $http({
            url: CONFIG.COMPLETE_API_URL + '/jobs/' + jobId
          })
          .success(function (d) {
            deffered.resolve(d)
          })
        return deffered.promise
      },
      new: function (job) {
        $ionicLoading.show()
        var req = {
          method: 'POST',
          url: CONFIG.COMPLETE_API_URL + '/jobs',
          data: job
        }
        $http(req).then(function () {
          // $scope.success()
          $ionicLoading.hide();
          $rootScope.$emit('GetUser');
          $rootScope.$emit('NewJobCreated', true)
        }, function () {
          $ionicLoading.hide()
          $ionicPopup.alert({
            title: $translate.instant('error_submit_modal_title'),
            template: $translate.instant('error_submit_modal_msg'),
            okText: $translate.instant('modal_ok_btn')
          });
        })
      },
      update: function (job) {
        $ionicLoading.show()
        var req = {
          method: 'PUT',
          url: CONFIG.COMPLETE_API_URL + '/jobs/' + job.id,
          data: job
        }
        $http(req).then(function () {
          $ionicLoading.hide()
          $rootScope.$emit('JobEdited', true)
        }, function () {
          $ionicLoading.hide()
          $ionicPopup.alert({
            title: $translate.instant('error_submit_modal_title'),
            template: $translate.instant('error_submit_modal_msg'),
            okText: $translate.instant('modal_ok_btn')
          })
        })
      }
    }
  })

  .factory('Pilot', function (
    $resource,
    $http,
    $q,
    localStorageService,
    $ionicLoading,
    $ionicPopup,
    dataShare,
    $location,
    $rootScope,
    CONFIG,
    $translate
  ) {
    return {
      get: function (pilotId) {
        var deffered = $q.defer()
        $http({
            url: CONFIG.COMPLETE_API_URL + '/pilots/' + pilotId
          })
          .success(function (d) {
            deffered.resolve(d)
          })
        return deffered.promise
      },
      query: function (search) {
        var req = {
          url: CONFIG.COMPLETE_API_URL + '/pilots',
          params: search
        }
        $ionicLoading.show()
        $http(req).then(function (response) {
          dataShare.set(response.data)
          $location.path('app-aom/aom-pilot-results/pilots')
        })
      },
      new: function (pilotProfile) {
        $ionicLoading.show()
        var req = {
          method: 'POST',
          url: CONFIG.COMPLETE_API_URL + '/pilots',
          data: pilotProfile,
          headers: {
            'Authorization': localStorageService.get('user_data').data.auth_token
          }
        }
        $http(req).then(function () {
          $ionicLoading.hide()
          $rootScope.$broadcast('PilotProfileCreated', true)
        }, function () {
          $ionicLoading.hide()
          $ionicPopup.alert({
            title: $translate.instant('error_submit_modal_title'),
            template: $translate.instant('error_submit_modal_msg'),
            okText: $translate.instant('modal_ok_btn')
          })
        })
      },
      update: function (pilotProfile) {
        $ionicLoading.show()
        var req = {
          method: 'PUT',
          url: CONFIG.COMPLETE_API_URL + '/pilots/' + pilotProfile.id,
          data: pilotProfile
        }

        $http(req).then(function () {
          $ionicLoading.hide()
          $rootScope.$emit('PilotProfileEdited', true)
        }, function () {
          $ionicLoading.hide()
          $ionicPopup.alert({
            title: $translate.instant('error_submit_modal_title'),
            template: $translate.instant('error_submit_modal_msg'),
            okText: $translate.instant('modal_ok_btn')
          })
        })
      }
    }
  })

  .factory('CrewMember', function (
    $resource,
    $http,
    $q,
    localStorageService,
    $ionicLoading,
    $ionicPopup,
    dataShare,
    $location,
    CONFIG,
    $rootScope,
    $translate
  ) {
    return {
      get: function (pilotId) {
        var deffered = $q.defer()
        $http({
            url: CONFIG.COMPLETE_API_URL + '/crew_members/' + pilotId
          })
          .success(function (d) {
            deffered.resolve(d)
          })
        return deffered.promise
      },
      query: function (search) {
        var req = {
          url: CONFIG.COMPLETE_API_URL + '/crew_members/',
          params: search
        }
        $ionicLoading.show()
        $http(req).then(function (response) {
          dataShare.set(response.data)
          $location.path('app-aom/aom-pilot-results/crew_members')
        })
      },
      new: function (crewMemberProfile) {
        $ionicLoading.show()
        var req = {
          method: 'POST',
          url: CONFIG.COMPLETE_API_URL + '/crew_members',
          data: crewMemberProfile,
          headers: {
            'Authorization': localStorageService.get('user_data').data.auth_token
          }
        }

        $http(req).then(function () {
          $ionicLoading.hide()
          $rootScope.$broadcast('CrewMemberProfileCreated', true)
        }, function () {
          $ionicLoading.hide()
          $ionicPopup.alert({
            title: $translate.instant('error_submit_modal_title'),
            template: $translate.instant('error_submit_modal_msg'),
            okText: $translate.instant('modal_ok_btn')
          })
        })
      },
      update: function (CrewMemberProfile) {
        $ionicLoading.show()
        var req = {
          method: 'PUT',
          url: CONFIG.COMPLETE_API_URL + '/crew_members/' + CrewMemberProfile.crew_member.id,
          data: CrewMemberProfile
        }

        $http(req).then(function () {
          $ionicLoading.hide()
          $rootScope.$emit('CrewMemberProfileEdited', true)
        }, function () {
          $ionicLoading.hide()
          $ionicPopup.alert({
            title: $translate.instant('error_submit_modal_title'),
            template: $translate.instant('error_submit_modal_msg'),
            okText: $translate.instant('modal_ok_btn')
          })
        })
      }
    }
  })

  .factory('authHttpRequestInterceptor', ['simpleStorage', function (simpleStorage) {
    return {
      request: function (config) {
        var authData = simpleStorage.getter('user_data').data
        if (authData && authData.auth_token) {
          config.headers['Authorization'] = authData.auth_token
        }
        return config
      }
    }
  }])

  .factory('checkInternetInterceptor', [
    '$q', '$rootScope', 'ConnectivityMonitor', '$injector',
    function (
      $q,
      $rootScope,
      ConnectivityMonitor,
      $injector
    ) {
      return {
        response: function (response) {
          return response
        },
        responseError: function (response) {
          var Session = $injector.get('Session')
          if (response.status === 401) {
            Session.delete()
          }

          var isOnline = ConnectivityMonitor.isOnline()
          $rootScope.$emit('loading:hide')
          if (!isOnline) {
            $rootScope.$emit('connectivityStatus', isOnline)
          }
          return $q.reject(response)
        }
      }
    }
  ])

  .factory('Session', function (
    UserSession,
    localStorageService,
    $rootScope,
    Utils,
    $location,
    microRouter,
    $http,
    reset,
    $ionicLoading,
    CONFIG
  ) {
    return {
      new: function (loginData) {
        $ionicLoading.show()

        var session = new UserSession({
          session: loginData
        })

        session.$save()
          .then(function (data) {
            localStorageService.set('user_data', {
              'data': data
            })

            $rootScope.$emit('session', true)

            if (window.plugins && window.plugins.OneSignal) {
              window.plugins.OneSignal.sendTag("user_id", data.id);
            }
          })
          .catch(function (response) {
            $ionicLoading.hide()
            Utils.showError(response)
            Utils.logError(response)
          })
        // .finally(function (){})
      },
      delete: function () {
        $ionicLoading.show()
        var current_id = localStorageService.get('user_data').data.id
        var url = CONFIG.COMPLETE_API_URL + '/sessions/' + current_id
        $http.delete(url, {}).then(function () {
          $rootScope.$emit('session', false)
          reset.userData()
          $location.path('/start')
          if (window.plugins && window.plugins.OneSignal) {
            window.plugins.OneSignal.sendTag("user_id", "null");
          }
        }, function (err) {
          setTimeout(function() {
            reset.userData()
            localStorageService.set('user_data', '')
            $location.path('/start')
            $ionicLoading.hide()
            if (window.plugins && window.plugins.OneSignal) {
              window.plugins.OneSignal.sendTag("user_id", "null");
            }
          }, 2000)
        })
      },
      listener: function () {
        $rootScope.$on('session', function (event, session_status) {
          var user_data = localStorageService.get('user_data').data
          var role = user_data.role
          var finished_registration = user_data.finished_registration
          if (session_status) microRouter.set(role, finished_registration)
          // if (!session_status) $location.path('/start')
        })
      }
    }
  })

  .factory('Conversation', function (
    $http,
    $q,
    localStorageService,
    $ionicLoading,
    $ionicPopup,
    $rootScope,
    CONFIG
  ) {
    return {
      query: function () {
        return $http.get(CONFIG.COMPLETE_API_URL + '/conversations')
      },
      get: function (conversationId, page, perPage) {
        return $http.get(
            CONFIG.COMPLETE_API_URL
            + '/conversations/'
            + conversationId
            + '?page='
            + page
            + '&per_page='
            + perPage
          )
      },
      new: function (conversation) {
        $ionicLoading.show()
        var req = {
          method: 'POST',
          url: CONFIG.COMPLETE_API_URL + '/conversations',
          data: conversation,
          headers: {
            'Authorization': localStorageService.get('user_data').data.auth_token
          }
        }
        return $http(req)
      }
    }
  })

  .factory('Message', function (
    $http, $q, localStorageService, $ionicLoading, $ionicPopup, $rootScope, CONFIG
  ) {
    return {
      new: function (message) {
        $ionicLoading.show()
        var req = {
          method: 'POST',
          url: CONFIG.COMPLETE_API_URL + '/messages',
          data: message,
          headers: {
            'Authorization': localStorageService.get('user_data').data.auth_token
          }
        }
        return $http(req)
      }
    }
  })
