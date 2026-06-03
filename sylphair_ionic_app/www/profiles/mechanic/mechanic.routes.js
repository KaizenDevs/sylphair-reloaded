sylphairApp.config(function ($stateProvider) {

  $stateProvider

    .state('app-mechanic', {
      url: '/app-mechanic',
      abstract: true,
      templateUrl: 'profiles/mechanic/templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app-forms.create-mechanic-profile', {
      url: '/create-mechanic-profile',
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/profile.html',
          controller: 'CreateMechanicProfileCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-mechanic-passport', {
      url: '/create-mechanic-passport',
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/passport.html',
          controller: 'CreateMechanicPassportCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-mechanic-visa', {
      url: '/create-mechanic-visa',
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/visa.html',
          controller: 'CreateMechanicVisaCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-mechanic-availability', {
      url: '/create-mechanic-availability',
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/availability.html',
          controller: 'CreateMechanicAvailabilityCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-mechanic-international-experience', {
      url: '/create-mechanic-international-experience',
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/international-experience.html',
          controller: 'CreateMechanicInternationExperienceCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-mechanic-professional-experience', {
      url: '/create-mechanic-professional-experience',
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/professional-experience.html',
          controller: 'CreateMechanicProfessionalExperienceCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-forms.create-mechanic-unavailable-days', {
      url: '/create-mechanic-unavailable-days',
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/unavailable-days.html',
          controller: 'CreateMechanicUnavailabilityCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-forms.create-mechanic-finish-registration', {
      url: '/create-mechanic-finish-registration',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/finish-registration.html',
          controller: 'CreateMechanicFinishRegistrationCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('app-mechanic.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/logged-in/home.html',
          controller: 'MechanicHomeCtrl',
          controllerAs: 'vm'
        }
      }
    })

    // .state('app-mechanic.my-profile', {
    //   url: '/my-profile',
    //   cache: false,
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'profiles/mechanic/templates/logged-in/my-profile.html',
    //       controller: 'mechanicMyProfileCtrl'
    //     }
    //   }
    // })

    .state('app-mechanic.my-profile', {
      url: '/my-profile/:CrewMemberId',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/logged-in/my-profile.html',
          controller: 'mechanicMyProfileCtrl',
          resolve: {
            mechanicDetails: function ($stateParams, User) {
              return User.get($stateParams.CrewMemberId);
            },
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-mechanic.job-search', {
      url: '/job-search',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/logged-in/job-search.html',
          controller: 'PilotJobSearchCtrl',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-mechanic.jobs-applied', {
      url: '/jobs-applied',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/pages/jobs-applied.html',
          controller: 'JobsAppliedMechanicCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-mechanic.messages', {
      url: '/messages/:conversationId',
      views: {
        'menuContent': {
          templateUrl: 'templates/pages/messages.html',
          controller: 'MessagesCtrl',
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

    .state('app-mechanic.messages-list', {
      url: '/messages-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/pages/messages-list.html',
          controller: 'MessagesCtrl',
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

    .state('app-forms.edit-mechanic-profile', {
      url: '/edit-mechanic-profile',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/profile.html',
          controller: 'EditMechanicCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {return []}
          }
        }
      }
    })

    .state('app-forms.edit-mechanic-passport', {
      url: '/edit-mechanic-passport',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/passport.html',
          controller: 'EditMechanicCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {return []}
          }
        }
      }
    })

    .state('app-forms.edit-mechanic-visa', {
      url: '/edit-mechanic-visa',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/visa.html',
          controller: 'EditMechanicCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {return []}
          }
        }
      }
    })

    .state('app-forms.edit-mechanic-availability', {
      url: '/edit-mechanic-availability',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/availability.html',
          controller: 'EditMechanicCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {return []}
          }
        }
      }
    })

    .state('app-forms.edit-mechanic-international-experience', {
      url: '/edit-mechanic-international-experience',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/international-experience.html',
          controller: 'EditMechanicCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {return []}
          }
        }
      }
    })

    .state('app-forms.edit-mechanic-professional-experience', {
      url: '/edit-mechanic-professional-experience',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/professional-experience.html',
          controller: 'EditMechanicCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function (allAircrafts) {
              return allAircrafts.get();
            }
          }
        }
      }
    })

    .state('app-forms.edit-mechanic-unavailable-days', {
      url: '/edit-mechanic-unavailable-days',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/unavailable-days.html',
          controller: 'EditMechanicCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {return []}
          }
        }
      }
    })

    .state('app-forms.edit-mechanic-finish-registration', {
      url: '/edit-mechanic-finish-registration',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'profiles/mechanic/templates/create/finish-registration.html',
          controller: 'mechanicEditFinishRegistrationCtrl',
          controllerAs: 'vm',
          resolve: {
            resolvedAllAircrafts: function () {return []}
          }
        }
      }
    })
})
