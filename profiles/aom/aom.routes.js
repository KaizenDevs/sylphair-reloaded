sylphairApp.config(function ($stateProvider) {
  $stateProvider

    .state('app-aom', {
      abstract: true,
      controller: 'AppCtrl',
      controllerAs: 'vm',
      templateUrl: 'profiles/aom/templates/menu.html',
      url: '/app-aom'
    })

    .state('app-aom.jobs', {
      url: '/jobs/:jobId',
      cache: false,
      // templateUrl: 'profiles/pilot/templates/logged-in/job-info.html',
      // controller: 'jobInfoCtrl',
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/logged-in/job-info.html',
          controller: 'jobInfoCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        jobDetails: function ($stateParams, Job) {
          return Job.get($stateParams.jobId)
        },
        resolvedAllAircrafts: function (allAircrafts) {
          return allAircrafts.get();
        }
      }
    })

    .state('app-forms.create-aom', {
      url: '/create-aom',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/create/finish-registration.html',
          controller: 'finishAomRegistrationCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-aom.my-profile', {
      url: '/my-profile',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/my-profile.html',
          controller: 'AomMyProfileCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-aom.aom-home', {
      url: '/aom-home',
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/home.html'
        }
      }
    })

    .state('app-aom.aom-pilot-search', {
      url: '/aom-pilot-search/:type_of_provider',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/pilot-search.html',
          controller: 'AomPilotSearchCtrl',
          controllerAs: 'vm',
          resolve: {
            // pilotDetails: function ($stateParams, Pilot) {
            //   return Pilot.get($stateParams.pilotId)
            // },
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-aom.aom-pilot-results', {
      url: '/aom-pilot-results/:resultType',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/pilot-results.html',
          controller: 'AomPilotResultsCtrl',
          controllerAs: 'vm',
          resolve: {
            // pilotDetails: function ($stateParams, Pilot) {
            //   return Pilot.get($stateParams.pilotId)
            // }
          }
        }
      }
    })

    .state('app-aom.aom-pilot-info', {
      url: '/pilots/:pilotId',
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/pilot-info.html',
          controller: 'AomPilotInfoCtrl',
          controllerAs: 'vm',
          resolve: {
            pilotDetails: function ($stateParams, Pilot) {
              return Pilot.get($stateParams.pilotId)
            },
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-aom.aom-flight-attendant-info', {
      url: '/flight-attendants/:pilotId',
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/pilot-info.html',
          controller: 'AomPilotInfoCtrl',
          controllerAs: 'vm',
          resolve: {
            pilotDetails: function ($stateParams, CrewMember) {
              return CrewMember.get($stateParams.pilotId)
            },
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-aom.aom-crew-member-info', {
      url: '/crew_members/:pilotId',
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/pilot-info.html',
          controller: 'AomPilotInfoCtrl',
          controllerAs: 'vm',
          resolve: {
            pilotDetails: function ($stateParams, CrewMember) {
              return CrewMember.get($stateParams.pilotId)
            },
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-aom.create-job', {
      url: '/create-job',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/create-job.html'
        }
      }
    })

    .state('app-aom.search', {
      url: '/search',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/search.html'
        }
      },
      resolve: {
        resolvedAllAircrafts: function (allAircrafts) {
          return allAircrafts.get();
        }
      }
    })

    .state('app-aom.new-pilot-job', {
      url: '/new-pilot-job',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/new-pilot-job.html',
          controller: 'AomCreatePilotJobCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-aom.edit-pilot-job', {
      url: '/edit-pilot-job/:jobId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/new-pilot-job.html',
          controller: 'AomEditPilotJobCtrl',
          controllerAs: 'vm',
          resolve: {
            jobDetails: function ($stateParams, Job) {
              return Job.get($stateParams.jobId)
            },
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-aom.edit-mechanic-job', {
      url: '/edit-mechanic-job/:jobId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/new-mechanic-job.html',
          controller: 'AomEditMechanicJobCtrl',
          controllerAs: 'vm',
          resolve: {
            jobDetails: function ($stateParams, Job) {
              return Job.get($stateParams.jobId)
            },
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-aom.edit-flight-attendant-job', {
      url: '/edit-flight-attendant-job/:jobId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/new-flight-attendant-job.html',
          controller: 'AomEditFlightAttendantJobCtrl',
          controllerAs: 'vm',
          resolve: {
            jobDetails: function ($stateParams, Job) {
              return Job.get($stateParams.jobId)
            },
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-aom.new-mechanic-job', {
      url: '/new-mechanic-job',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/new-mechanic-job.html',
          controller: 'AomCreateMechanicJobCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-aom.new-flight-attendant-job', {
      url: '/new-flight-attendant-job',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/new-flight-attendant-job.html',
          controller: 'AomCreateFlightAttendantJobCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-aom.jobs-created', {
      url: '/jobs-created',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/aom/templates/logged-in/jobs-created.html',
          controller: 'JobsCreatedCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            },
            // jobDetails: function ($stateParams, Job) {
            //   return Job.get($stateParams.jobId)
            // }
          }
        }
      }
    })

    .state('app-aom.pilot-job-info', {
      url: '/jobs/:jobId',
      views: {
        'menuContent': {
          templateUrl: 'templates/pilot/logged-in/job-info.html',
          controller: 'jobInfoCtrl',
          controllerAs: 'vm',
          resolve: {
            jobDetails: function ($stateParams, Job) {
              return Job.get($stateParams.jobId)
            },
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-aom.messages', {
      url: '/messages/:conversationId',
      views: {
        'menuContent': {
          templateUrl: 'templates/pages/messages.html',
          controller: 'MessagesCtrl',
          controllerAs: 'vm',
          resolve: {
            ctrlOptions: function () {
              return {
                getConversations: false
              }
            }
          }
        }
      }
    })

    .state('app-aom.messages-list', {
      url: '/messages-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/pages/messages-list.html',
          controller: 'MessagesCtrl',
          controllerAs: 'vm',
          resolve: {
            ctrlOptions: function () {
              return {
                getConversations: true
              }
            }
          }
        }
      }
    })
})
