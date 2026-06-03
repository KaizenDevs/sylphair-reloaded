/* exported sylphairApp */
'use strict'

var sylphairApp = angular.module('sylphairApp', [ // jshint ignore:line
  'pascalprecht.translate',
  'ionic',
  'ngMessages',
  'LocalStorageModule',

  'sylphairApp.routes',

  'sylphairApp.config',
  'sylphairApp.controller',
  'sylphairApp.filters',
  'sylphairApp.services',
  'sylphairApp.routing-services',
  'sylphairApp.api-services',
  'sylphairApp.constants',

  'loading-controller',
  'login-controller',
  'messages-controller',
  'registration-controller',
  'edit-user-controller',
  'create-pilot-profile-controller',
  'create-pilot-international-experience-controller',
  'create-pilot-unavailability-controller',
  'create-pilot-flight-hours-controller',
  'create-pilot-medical-controller',

  'edit-pilot-profile-controller',
  'edit-pilot-finish-registration-controller',

  // 'create-aom-controller',
  'create-flight-attendant-profile-controller',
  'create-flight-attendant-passport-controller',
  'create-flight-attendant-visa-controller',
  'create-flight-attendant-availability-controller',
  'create-flight-attendant-international-experience-controller',
  'create-flight-attendant-professional-experience-controller',
  'create-flight-attendant-unavailability-controller',
  'create-flight-attendant-finish-registration-controller',
  'create-flight-attendant-profile-controller',
  'create-flight-attendant-passport-controller',
  'create-flight-attendant-visa-controller',
  'create-flight-attendant-availability-controller',
  'create-flight-attendant-international-experience-controller',
  'create-flight-attendant-professional-experience-controller',
  'create-flight-attendant-unavailability-controller',
  'create-flight-attendant-finish-registration-controller',

  'create-mechanic-profile-controller',
  'create-mechanic-passport-controller',
  'create-mechanic-visa-controller',
  'create-mechanic-availability-controller',
  'create-mechanic-international-experience-controller',
  'create-mechanic-professional-experience-controller',
  'create-mechanic-unavailability-controller',
  'create-mechanic-finish-registration-controller',
  'create-mechanic-profile-controller',
  'create-mechanic-passport-controller',
  'create-mechanic-visa-controller',
  'create-mechanic-availability-controller',
  'create-mechanic-international-experience-controller',
  'create-mechanic-professional-experience-controller',
  'create-mechanic-unavailability-controller',
  'create-mechanic-finish-registration-controller',

  'finish-aom-registration-controller',
  'aircraft-owner-welcome-controller',
  'availability-controller',
  'licences-controller',
  'type-rating-controller',
  'passport-controller',
  'visa-controller',
  'aom-pilot-search-controller',
  'aom-pilot-results-controller',
  'aom-pilot-info-controller',
  'aom-my-profile-controller',
  'aom-create-pilot-job-controller',
  'aom-create-flight-attendant-job-controller',
  'aom-create-mechanic-job-controller',
  'jobs-created-controller',

  'aom-edit-pilot-job-controller',
  'aom-edit-mechanic-job-controller',
  'aom-edit-flight-attendant-job-controller',

  'mechanic-my-profile-controller',
  'mechanic-my-jobs-controller',
  'mechanic-home-controller',
  'edit-mechanic-profile-controller',
  'edit-mechanic-finish-registration-controller',

  'flight-attendant-my-profile-controller',
  'flight-attendant-home-controller',
  'attendant-my-jobs-controller',

  'edit-flight-attendant-profile-controller',
  'edit-flight-attendant-finish-registration-controller',

  'pilot-my-profile-controller',
  'pilot-home-controller',
  'pilot-job-search-controller',
  'pilot-job-results-controller',
  'pilot-job-info-controller',
  'pilot-finish-registration-controller',
  'pilot-my-jobs-controller',

  'ngResource',
  'ngCordova',
  'ionic-multi-date-picker',
  'pusher-angular',

  'ngLodash',

  'sylphairMock'
]);

sylphairApp
  .run(function (
    $cordovaSplashscreen,
    $http,
    $ionicHistory,
    $ionicLoading,
    $ionicPlatform,
    $ionicPopup,
    $ionicSideMenuDelegate,
    $ionicScrollDelegate,
    $location,
    $rootScope,
    $timeout,
    dataSelects,
    lodash,
    localStorageService,
    CONFIG,
    $translate,
    Conversation,
    $state,
    Utils
  ) {
    localStorageService.set('newMessage', null);

    $ionicPlatform.ready(function () {
        $ionicPlatform.on('resume', function() {
          var inConversation = $state.current.url === "/messages/:conversationId"
          if (inConversation) {
            console.log('refresh!')
             $rootScope.$emit('UpdateMessages');
            }
        });

        $ionicPlatform.on('pause', function() {
            //Do something here on entering background
        });

        var notificationReceivedCallback = function(data) {
            var conversationId = data.payload.additionalData.conversation_id;
            $rootScope.inAppAlert.show(conversationId, data);
        }


      if (window.plugins && window.plugins.OneSignal) {
        window.plugins.OneSignal
          .startInit(window.ONESIGNAL_APP_ID || "")
          .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.None)
          .handleNotificationReceived(notificationReceivedCallback)
          .endInit();
      }

    });

    window.addEventListener('native.keyboardshow', function () {
        $ionicScrollDelegate.scrollBy(0, 1); //This will return focus to the current input once the keyboard slides-up in the view
    });

    dataSelects.get('countries').then(function (res) {
      $rootScope.countries = res.data
    })
    dataSelects.get('languages').then(function (res) {
      $rootScope.languages = res.data
    })
    dataSelects.get('aircrafts').then(function (res) {
      var data = lodash.orderBy(res.data, ['name'], ['asc']);
      $rootScope.aircrafts = data;
    })

    dataSelects.get('pilot_positions').then(function (res) {
      $rootScope.pilot_positions = res.data
    })

    dataSelects.get('pilot_type_of_licenses_attributes').then(function (res) {
      $rootScope.pilot_type_of_licenses_attributes = res.data
    })

    dataSelects.get('pilot_licenses_issuance_authorities').then(function (res) {
      $rootScope.pilot_licenses_issuance_authorities = res.data
    })

    dataSelects.get('pilot_medical_type').then(function (res) {
      $rootScope.pilot_medical_type = res.data
    })

    dataSelects.get('pilot_medical_issuance_authorities').then(function (res) {
      $rootScope.pilot_medical_issuance_authorities = res.data
    })

    dataSelects.get('pilot_english_proficiency_level').then(function (res) {
      $rootScope.pilot_english_proficiency_level = res.data
    })

    dataSelects.get('contract_types').then(function (res) {
      $rootScope.contract_types = res.data
    })

    dataSelects.get('gender').then(function (res) {
      $rootScope.genders = res.data
    })
    dataSelects.get('gender_with_any').then(function (res) {
      $rootScope.genders_with_any = res.data
    })

    dataSelects.get('mechanic_position').then(function (res) {
      $rootScope.mechanic_position = res.data
    })

    dataSelects.get('mechanic_issuance_authorities').then(function (res) {
      $rootScope.mechanic_issuance_authorities = res.data
    })

    dataSelects.get('flight_attendant_position').then(function (res) {
      $rootScope.flight_attendant_position = res.data
    })

    dataSelects.get('language_levels').then(function (res) {
      $rootScope.language_levels = res.data
    })
    dataSelects.get('profiles').then(function (res) {
      $rootScope.profiles = res.data
    })

    $rootScope.$on('loading:show', function () {
      $ionicLoading.show({
        template: $translate.instant('please_wait_label')
      })
    })

    $rootScope.$on('loading:hide', function () {
      $ionicLoading.hide()
    })

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.$broadcast('loading:show')
    })

    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.$broadcast('loading:hide')
    })

    $rootScope.$on('NewJobCreated', function () {
      $ionicPopup.alert({
        title: $translate.instant('great_label'),
        template: $translate.instant('job_posted_msg'),
        okText: $translate.instant('modal_ok_btn')
      }).then(function () {
        $timeout(function () {
          $location.path('app-aom/aom-home')
        }, 250)
      })
    })

    $rootScope.$on('JobEdited', function () {
      $ionicHistory.goBack()
    })

    $rootScope.$on('GetUser', function () {
      var userId = localStorageService.get('user_data').data.id
      var getUserURL = {
        url: CONFIG.COMPLETE_API_URL + '/users/' + userId
      }
      $http(getUserURL).then(function (response) {
        localStorageService.set('user_data', response)
      }, function (response) {
        Utils.showError(response);
      });
    })

    $rootScope.$on('UpdateMessages', function() {
      Conversation.query().then(function (response) {
        $rootScope.conversations = response.data
      });
    });

    $rootScope.$on('connectivityStatus', function () {
      $ionicPopup.alert({
        title: $translate.instant('no_conection_msg'),
        template: $translate.instant('no_conection_title'),
        okText: $translate.instant('modal_ok_btn')
      }).then(function () {
        // $timeout(function () {$location.path('app-aom/aom-home')}, 250)
      })
    })

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)

      console.log(Raven);

      if (window.cordova && window.Keyboard) {
        window.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        window.plugins.Keyboard.disableScroll(false);
      }

      if (window.StatusBar) {
        StatusBar.overlaysWebView(true)
        // StatusBar.style(1) // Light
      }

      $ionicSideMenuDelegate.canDragContent(false)
    })
  });

sylphairApp.config(function ($translateProvider) {
  $translateProvider.translations('en', english);
  $translateProvider.translations('zh', chinese);
  $translateProvider.translations('sp', spanish);
  $translateProvider.preferredLanguage('en');
  // $translateProvider.useSanitizeValueStrategy('sanitize');

});

sylphairApp.controller('sylphairController', function ($scope, $rootScope, $translate, $timeout, $state) {
  $rootScope.activateLanguages = true;
  $rootScope.inAppAlert = {
    title: '',
    message: '',
    className: 'in-app-notification hide',
    close: function() {
      $rootScope.inAppAlert.className = 'in-app-notification hide';
    },
    show: function(pushCoversationId, data) {
      $rootScope.inAppAlert.title = data.payload.body;
      $rootScope.inAppAlert.message = data.payload.additionalData.sender_name;

      $timeout(function() {
        $rootScope.$emit('UpdateMessages');
        var currentURL = String($state.current.url);
        var conversationId = $state.params.conversationId;
        var isNotInChat = currentURL !== "/messages/:conversationId";
        var isNotinChatConversation = Number(pushCoversationId) !== Number(conversationId);
        var inAppNotification = document.getElementById('in-app-alert');

        if (isNotInChat && isNotinChatConversation) {
            inAppNotification.classList.remove('hide');
            $timeout(function() {
              inAppNotification.classList.add('hide');
            }, 5000);
        }
      }, 1000);
    }
  }

  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
});

sylphairApp.directive('buttonLangEn', function() {
  return {
    template: '<img width="20" ng-src="img/uk-flag.png"> \
               <a width="30" translate="button_lang_en"></a>'
  };
});

sylphairApp.directive('buttonLangZh', function() {
  return {
    template: '<img width="20" ng-src="img/chinesse-flag.png"> \
              <a width="30" translate="button_lang_zh"></a>'
  };
});

sylphairApp.directive('buttonLangSp', function() {
  return {
    template: '<img width="20" ng-src="img/spanish-flag.png"> \
              <a width="30" translate="button_lang_sp"></a>'
  };
});

sylphairApp.directive('inAppAlert', function() {
  return {
    template:
      "<div id='in-app-alert' ng-click='inAppAlert.close()' \
        ng-class='inAppAlert.className'>  \
        <p class='title'>{{inAppAlert.title}}</p>  \
        <p class='message'>{{inAppAlert.message}}</p>  \
      </div>"
  };
});
