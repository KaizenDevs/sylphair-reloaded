	angular.module('edit-mechanic-finish-registration-controller', [])
	angular.module('edit-mechanic-finish-registration-controller')
	  .controller('mechanicEditFinishRegistrationCtrl', function (
	    $http,
	    $rootScope,
	    $scope,
	    $location,
	    $ionicLoading,
	    $filter,
	    simpleStorage,
	    localStorageService,
	    sendProfileObject,
	    traitInitializer,
	    toggler,
	    $timeout,
	    $ionicPopup,
	    $ionicScrollDelegate,
	    profileDataManagement,
	    User,
	    Utils,
	    $ionicHistory,
	    EditProfileRouter,
	    CrewMember
	  ) {
	    $scope.URLs = EditProfileRouter.nextBackURLs($ionicHistory.currentView().url)
	    $scope.backURL = $scope.URLs.backURL
	    $scope.nextURL = $scope.URLs.nextURL

	    var userID = localStorageService.get('user_data').data.id
	    $scope.currentKey = profileDataManagement.defineKey(userID, 'Mechanic', 'edit')
	    $scope.Mechanic = simpleStorage.getter($scope.currentKey)
	    $scope.showCancelEdit = true

	    $scope.cancelEdit = function () {
	      localStorageService.remove($scope.currentKey)
	      $location.path('app-mechanic/my-profile/' + userID)
	    }

	    $scope.user = simpleStorage.getter('user_data').data

	    if ($scope.Mechanic.unavailable_days_attributes !== null &&
	      $scope.Mechanic.unavailable_days_attributes !== undefined &&
	      $scope.Mechanic.unavailable_days_attributes.length > 0) {
	      $scope.datesRanges = $filter('dataRanges')($scope.Mechanic.unavailable_days_attributes);
	    }

	    $scope.Mechanic = sendProfileObject.cleanArrays($scope.Mechanic)
	    $scope.submit = function () {
	      $scope.Mechanic.profile.user_id = userID
	      if ($scope.Mechanic.unavailable_days_attributes != null) {
	        if (typeof $scope.Mechanic.unavailable_days_id !== 'undefined' &&
	          $scope.Mechanic.unavailable_days_attributes.length === 0) {
	          $scope.Mechanic.unavailable_days_attributes.push({
	            _destroy: true,
	            id: $scope.Mechanic.unavailable_days_id
	          })
	        }
	      }

	      delete $scope.Mechanic.unavailable_days_id
	      // localStorageService.set('temp', {'crew_member': $scope.Mechanic })
	      CrewMember.update({
	        'crew_member': $scope.Mechanic
	      })
	    }

	    $scope.toggleGroup = function (state, variable) {
	      $scope[variable] = toggler.toggle($scope[variable])
	      $timeout(function () {
	        $ionicScrollDelegate.resize()
	      }, 100)
	    }

	    $rootScope.$on('CrewMemberProfileEdited', function () {
	      User.get().then(function (response) {
	        $scope.user = response
	        localStorageService.set('user_data', {
	          data: response
	        })
	        $location.path('app-mechanic/my-profile/' + userID)
	        localStorageService.remove($scope.currentKey)
	        $ionicLoading.hide()
	      }, function (response) {
	        Utils.showError(response)
	      })
	    })

	    $scope.goDown = function () {
	      $ionicScrollDelegate.scrollTo(0, 1000);
	    }

	  })
