angular.module('messages-controller', [])
angular.module('messages-controller')
  .controller('MessagesCtrl', function (
    $ionicLoading,
    $ionicPopup,
    $ionicScrollDelegate,
    $rootScope,
    $scope,
    $state,
    $stateParams,
    $timeout,
    Conversation,
    ctrlOptions,
    localStorageService,
    Message,
    Utils
  ) {
    $scope.userId = localStorageService.get('user_data').data.id;
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.isLastPage = false;
    $scope.isFetchingData = false;
    $scope.messages = [];
    $scope.coversationId = $stateParams.conversationId;

    // alert('sup');

    function updateConversation(goBottom) {
      $scope.isFetchingData = true;

      Conversation.get(
        $stateParams.conversationId,
        $scope.page,
        $scope.perPage
      ).then(function (response) {
        if (!$scope.isLastPage) {
          if (response.data.recipient_id === localStorageService.get('user_data').data.id) {
            $scope.recipient = response.data.sender_data
            $scope.recipient_id = response.data.sender_id
          } else {
            $scope.recipient = response.data.recipient_data
            $scope.recipient_id = response.data.recipient_id
          }

          var newMessages = response.data.messages;
          $scope.messages = $scope.messages.concat(newMessages);
          $scope.messages = Utils.sortByKey($scope.messages, 'id');

          $scope.isLastPage = response.data.is_last_page
          $scope.isFetchingData = false;

          $scope.messages = Utils.addDate($scope.messages);
        }
      }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
       if (goBottom) {$ionicScrollDelegate.scrollBottom()}
     });
    }

    if (ctrlOptions.getConversations) {
      // $rootScope.$emit('UpdateMessages')
      $ionicScrollDelegate.scrollBottom()
      var role = localStorageService.get('user_data').data.role

      switch (role) {
        case 'pilot':
          $scope.messagesRoute = 'app-pilot'
          break
        case 'flight attendant':
          $scope.messagesRoute = 'app-flight-attendant'
          break
        case 'mechanic':
          $scope.messagesRoute = 'app-mechanic'
          break
        case 'aircraft owner':
          $scope.messagesRoute = 'app-aom'
          break
      }
    } else {
      // $rootScope.$emit('UpdateMessages');
      $state.go($state.current, {}, {
        reload: true
      })
      $ionicScrollDelegate.scrollBottom()
      $scope.newMessage = ''
      $scope.setMessage = ''

      updateConversation();

      $scope.doRefresh = function() {
        if (!$scope.isLastPage) {
          $scope.page += 1;
          updateConversation(false);
        }
        if ($scope.isLastPage) {
          $scope.$broadcast('scroll.refreshComplete');
        }
      };

      $scope.sendMessage = function () {
        if ($scope.newMessage !== '') {
          $scope.setMessage = {
            'message': {
              'content': $scope.newMessage,
              'user_id': localStorageService.get('user_data').data.id,
              'conversation_id': $stateParams.conversationId
            },
            'recipient_id': $scope.recipient_id
          }

          Message.new($scope.setMessage).then(function () {
            $ionicLoading.hide()
            $scope.newMessage = ''
            updateConversation();
            $rootScope.$emit('UpdateMessages');
          }, function () {
            $ionicLoading.hide()
            $ionicPopup.alert({
              title: 'Error',
              template: 'something happened'
            })
          })
        }
      }
    }

    $scope.scrollToBottom = function () {
      $timeout(function () {
        $ionicScrollDelegate.scrollBottom()
      }, 1000)
    }

    $rootScope.$on('UpdateMessages', function() {
      $scope.page = 1;
      $ionicScrollDelegate.scrollBottom();
      $scope.isLastPage = false;
      updateConversation();
    });

    $scope.scrollToBottom();
    updateConversation();
  })
