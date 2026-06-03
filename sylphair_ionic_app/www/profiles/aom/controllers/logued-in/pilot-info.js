angular.module('aom-pilot-info-controller', [])
angular.module('aom-pilot-info-controller')
  .controller('AomPilotInfoCtrl', function (
    $scope,
    $filter,
    $http,
    $ionicPopup,
    pilotDetails,
    toggler,
    $timeout,
    $ionicScrollDelegate,
    $ionicLoading,
    localStorageService,
    $location,
    $ionicHistory,
    Conversation,
    resolvedAllAircrafts
  ) {
    $scope.goBack = function () {
      $ionicHistory.goBack()
    }
    $scope.pilot = pilotDetails
    $scope.aircrafts = resolvedAllAircrafts
    $scope.toggleGroup = function (state, variable) {
      $scope[variable] = toggler.toggle($scope[variable])
      $timeout(function () {
        $ionicScrollDelegate.resize()
      }, 100)
    }
    if ($scope.pilot.unavailable_days.length > 0) {
      $scope.datesRanges = $filter('dataRanges')($scope.pilot.unavailable_days[0].dates)
    }

    $scope.createConversation = function (recipientId) {
      $ionicLoading.show()
      var conversation = {
        'conversation': {
          'recipient_id': recipientId
        }
      }
      Conversation.new(conversation).then(function (response) {
        // $ionicLoading.hide()
        $location.path('app-aom/messages/' + response.data.id)
      }, function () {
        $ionicLoading.hide()
        $ionicPopup.alert({
          title: 'Error',
          template: 'something happened'
        })
      })
    }

    $scope.redirectCvUrl = function () {
      window.open('http://www.sylphairaviation.com/privacy.html', '_system', 'location=yes');
    }

  })
