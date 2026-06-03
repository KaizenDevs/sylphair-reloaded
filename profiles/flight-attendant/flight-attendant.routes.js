sylphairApp.config(function ($stateProvider) {

  $stateProvider

    .state('app-flight-attendant', {
      url: '/app-flight-attendant',
      abstract: true,
      templateUrl: 'profiles/flight-attendant/templates/menu.html',
      controller: 'AppCtrl',
      controllerAs: 'vm'
    })

    .state('app-forms.create-flight-attendant-profile', {
      url: '/create-flight-attendant-profile',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/profile.html',
          controller: 'CreateFlightAttendantProfileCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-flight-attendant-passport', {
      url: '/create-flight-attendant-passport',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/passport.html',
          controller: 'createFlightAttendantPassportCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-flight-attendant-visa', {
      url: '/create-flight-attendant-visa',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/visa.html',
          controller: 'createFlightAttendantVisaCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-flight-attendant-availability', {
      url: '/create-flight-attendant-availability',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/availability.html',
          controller: 'createFlightAttendantAvailabilityCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-flight-attendant-international-experience', {
      url: '/create-flight-attendant-international-experience',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/international-experience.html',
          controller: 'createFlightAttendantInternationExperienceCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-flight-attendant-professional-experience', {
      url: '/create-flight-attendant-professional-experience',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/professional-experience.html',
          controller: 'createFlightAttendantProfessionalExperienceCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-forms.create-flight-attendant-unavailable-days', {
      url: '/create-flight-attendant-unavailable-days',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/unavailable-days.html',
          controller: 'createFlightAttendantUnavailabilityCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-flight-attendant-finish-registration', {
      url: '/create-flight-attendant-finish-registration',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/finish-registration.html',
          controller: 'createFlightAttendantFinishRegistrationCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-flight-attendant.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/logged-in/home.html',
          controller: 'FlightAttendantHomeCtrl',
          controllerAs: 'vm'

        }
      }
    })

    // .state('app-flight-attendant.my-profile', {
    //   url: '/my-profile',
    //   cache: false,
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'profiles/flight-attendant/templates/logged-in/my-profile.html',
    //       controller: 'FlightAttendatMyProfileCtrl'
    //     }
    //   }
    // })

    .state('app-flight-attendant.my-profile', {
      url: '/my-profile/:crewMemberId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/logged-in/my-profile.html',
          controller: 'FlightAttendatMyProfileCtrl',
          controllerAs: 'vm',
          resolve: {
            crewMembersDetails: function ($stateParams, CrewMember) {
              return CrewMember.get($stateParams.crewMemberId);
            }
          }
        }
      }

    })

    .state('app-flight-attendant.jobs-applied', {
      url: '/jobs-applied',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/pages/jobs-applied.html',
          controller: 'JobsAppliedAttendantCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-flight-attendant.job-search', {
      url: '/job-search',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/logged-in/job-search.html',
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

    .state('app-flight-attendant.messages', {
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
              };
            }
          }
        }
      }
    })

    .state('app-flight-attendant.messages-list', {
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
              };
            }
          }
        }
      }
    })

    .state('app-forms.edit-flight-attendant-profile', {
      url: '/edit-flight-attendant-profile',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/profile.html',
          controller: 'EditFlightAttendantCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.edit-flight-attendant-passport', {
      url: '/edit-flight-attendant-passport',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/passport.html',
          controller: 'EditFlightAttendantCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.edit-flight-attendant-visa', {
      url: '/edit-flight-attendant-visa',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/visa.html',
          controller: 'EditFlightAttendantCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.edit-flight-attendant-availability', {
      url: '/edit-flight-attendant-availability',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/availability.html',
          controller: 'EditFlightAttendantCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.edit-flight-attendant-international-experience', {
      url: '/edit-flight-attendant-international-experience',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/international-experience.html',
          controller: 'EditFlightAttendantCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.edit-flight-attendant-professional-experience', {
      url: '/edit-flight-attendant-professional-experience',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/professional-experience.html',
          controller: 'EditFlightAttendantCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-forms.edit-flight-attendant-unavailable-days', {
      url: '/edit-flight-attendant-unavailable-days',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/unavailable-days.html',
          controller: 'EditFlightAttendantCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.edit-flight-attendant-finish-registration', {
      url: '/edit-flight-attendant-finish-registration',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/flight-attendant/templates/create/finish-registration.html',
          controller: 'flightAttendantEditFinishRegistrationCtrl',
          controllerAs: 'vm'
        }
      }
    })

})
