sylphairApp.config(function ($stateProvider) {
  $stateProvider

    .state('app-pilot', {
      url: '/app-pilot',
      abstract: true,
      templateUrl: 'profiles/pilot/templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app-pilot.messages', {
      url: '/messages/:conversationId',
      views: {
        'menuContent': {
          templateUrl: 'templates/pages/messages.html',
          controller: 'MessagesCtrl',
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
    .state('app-pilot.messages-list', {
      url: '/messages-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/pages/messages-list.html',
          controller: 'MessagesCtrl',
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
    .state('app-forms.create-pilot-profile', {
      url: '/create-pilot-profile',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/profile.html',
          controller: 'CreatePilotProfileCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('app-forms.edit-pilot-profile', {
      url: '/edit-pilot-profile',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/profile.html',
          controller: 'EditPilotProfileCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {
              return [];
            }
          }
        }
      }
    })
    .state('app-forms.edit-pilot-licences', {
      url: '/edit-pilot-licences',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/licences.html',
          controller: 'EditPilotProfileCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {
              return [];
            }
          }
        }
      }
    })
    .state('app-forms.edit-pilot-medical', {
      url: '/edit-pilot-medical',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/medical.html',
          controller: 'EditPilotProfileCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {
              return [];
            }
          }
        }
      }
    })
    .state('app-forms.edit-pilot-flight-hours', {
      url: '/edit-pilot-flight-hours',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/flight-hours.html',
          controller: 'EditPilotProfileCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {
              return [];
            }
          }
        }
      }
    })
    .state('app-forms.edit-pilot-type-rating', {
      url: '/edit-pilot-type-rating',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/type-rating.html',
          controller: 'EditPilotProfileCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })
    .state('app-forms.edit-pilot-international-experience', {
      url: '/edit-pilot-international-experience',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/international-experience.html',
          controller: 'EditPilotProfileCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {
              return [];
            }
          }
        }
      }
    })
    .state('app-forms.edit-pilot-passport', {
      url: '/edit-pilot-passport',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/passport.html',
          controller: 'EditPilotProfileCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {
              return [];
            }
          }
        }
      }
    })
    .state('app-forms.edit-pilot-visa', {
      url: '/edit-pilot-visa',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/visa.html',
          controller: 'EditPilotProfileCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {
              return [];
            }
          }
        }
      }
    })
    .state('app-forms.edit-pilot-availability', {
      url: '/edit-pilot-availability',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/availability.html',
          controller: 'EditPilotProfileCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {
              return [];
            }
          }
        }
      }
    })
    .state('app-forms.edit-pilot-unavailable-days', {
      url: '/edit-pilot-unavailable-days',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/unavailable-days.html',
          controller: 'EditPilotProfileCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {
              return [];
            }
          }
        }
      }
    })
    .state('app-forms.edit-pilot-finish-registration', {
      url: '/edit-pilot-finish-registration',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/finish-registration.html',
          controller: 'pilotEditFinishRegistrationCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })
    .state('app-forms.create-pilot-licences', {
      url: '/create-pilot-licences',
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/licences.html',
          controller: 'licencesCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('app-forms.create-pilot-medical', {
      url: '/create-pilot-medical',
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/medical.html',
          controller: 'CreatePilotMedicalCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('app-forms.create-pilot-flight-hours', {
      url: '/create-pilot-flight-hours',
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/flight-hours.html',
          controller: 'CreatePilotFlightHoursCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('app-forms.create-pilot-type-rating', {
      url: '/create-pilot-type-rating',
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/type-rating.html',
          controller: 'typeRatingCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })
    .state('app-forms.create-pilot-international-experience', {
      url: '/create-pilot-international-experience',
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/international-experience.html',
          controller: 'CreatePilotInternationExperienceCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('app-forms.create-pilot-passport', {
      url: '/create-pilot-passport',
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/passport.html',
          controller: 'passportCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('app-forms.create-pilot-visa', {
      url: '/create-pilot-visa',
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/visa.html',
          controller: 'visaCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('app-forms.create-pilot-availability', {
      url: '/create-pilot-availability',
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/availability.html',
          controller: 'availabilityCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('app-forms.create-pilot-unavailable-days', {
      url: '/create-pilot-unavailable-days',
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/unavailable-days.html',
          controller: 'CreatePilotUnavailabilityCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('app-forms.create-pilot-finish-registration', {
      url: '/create-pilot-finish-registration',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/create/finish-registration.html',
          controller: 'pilotFinishRegistrationCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })
    .state('app-pilot.pilot-my-profile', {
      url: '/pilot-my-profile/:pilotId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/logged-in/my-profile.html',
          controller: 'pilotMyProfileCtrl',
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

    .state('app-pilot.jobs-applied', {
      url: '/jobs-applied',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/pages/jobs-applied.html',
          controller: 'JobsAppliedPilotCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-pilot.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/logged-in/home.html',
          controller: 'pilotHomeCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('app-pilot.pilot-job-search', {
      url: '/pilot-job-search',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/logged-in/job-search.html',
          controller: 'PilotJobSearchCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })
    .state('app-pilot.pilot-job-results', {
      url: '/pilot-job-results',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/pilot/templates/logged-in/job-results.html',
          controller: 'jobResultsCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })
})
