angular.module('flight-attendant-home-controller', []);
angular.module('flight-attendant-home-controller')
.controller('FlightAttendantHomeCtrl',function ( $rootScope, localStorageService ) {
  $rootScope.crewMemberId = localStorageService.get('user_data').data.crew_member.id;
})
