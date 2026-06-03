angular.module('sylphairApp.routes', [])
angular.module('sylphairApp.routes')
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app-forms', {
    url: '/app-forms',
    abstract: true,
    templateUrl: 'templates/pages/menu-forms.html',
    controller: 'AppCtrl'
  })

  .state('start', {
    url: '/start',
    templateUrl: 'templates/pages/start.html',
    controller: 'AppCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/pages/login.html',
    controller: 'LoginCtrl',
    cache: false
  })

  // .state('app-pilot.logged-in', {
  //   url: '/logged-in',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/pilot/logged-in/index.html'
  //     }
  //   }
  // })

  .state('loading', {
    url: '/loading',
    templateUrl: 'templates/pages/loading.html'
  })

  .state('registration', {
    url: '/registration',
    cache: false,
    templateUrl: 'templates/pages/registration.html',
    controller: 'RegistrationCtrl'
  })

  .state('edit-user', {
    url: '/edit-user',
    cache: false,
    templateUrl: 'templates/pages/edit-user.html',
    controller: 'EditUserCtrl'
  })

  .state('jobs', {
    url: '/jobs/:jobId',
    cache: false,
    templateUrl: 'profiles/pilot/templates/logged-in/job-info.html',
    controller: 'jobInfoCtrl',
    resolve: {
      jobDetails: function ($stateParams, Job) {
        return Job.get($stateParams.jobId)
      },
      resolvedAllAircrafts: function (allAircrafts) {
        return allAircrafts.get();
      }
    }
  })

  $urlRouterProvider.otherwise('start')
})
