angular.module('sylphairApp.routing-services', []); //instantiates
angular.module('sylphairApp.routing-services')

  .factory('SearchJobRoleRouter', function (localStorageService, $location) {
    return {
      currentUser: function () {
        var role = localStorageService.get('user_data').data.role;
        switch (role) {
          case 'pilot':
            $location.path('app-pilot/pilot-job-search')
            break;
          case 'flight attendant':
            $location.path('app-flight-attendant/job-search')
            break;
          case 'mechanic':
            $location.path('app-mechanic/job-search')
            break;
        }
      }
    }
  })

  .factory('EditProfileRouter', function () {
    return {
      nextBackURLs: function (currentView) {
        var urls = {}
        switch (currentView) {
          case '/app-forms/create-pilot-profile':
            urls.backURL = '';
            urls.nextURL = '#/app-forms/create-pilot-licences';
            return urls;
            break;
          case '/app-forms/create-pilot-licences':
            urls.backURL = '#/app-forms/create-pilot-profile';
            urls.nextURL = '#/app-forms/create-pilot-medical';
            return urls;
            break;
          case '/app-forms/create-pilot-medical':
            urls.backURL = '#/app-forms/create-pilot-licences';
            urls.nextURL = '#/app-forms/create-pilot-flight-hours';
            return urls;
            break;
          case '/app-forms/create-pilot-flight-hours':
            urls.backURL = '#/app-forms/create-pilot-medical';
            urls.nextURL = '#/app-forms/create-pilot-type-rating';
            return urls;
            break;
          case '/app-forms/create-pilot-type-rating':
            urls.backURL = '#/app-forms/create-pilot-flight-hours';
            urls.nextURL = '#/app-forms/create-pilot-international-experience';
            return urls;
            break;
          case '/app-forms/create-pilot-international-experience':
            urls.backURL = '#/app-forms/create-pilot-type-rating';
            urls.nextURL = '#/app-forms/create-pilot-passport';
            return urls;
            break;
          case '/app-forms/create-pilot-passport':
            urls.backURL = '#/app-forms/create-pilot-international-experience';
            urls.nextURL = '#/app-forms/create-pilot-visa';
            return urls;
            break;
          case '/app-forms/create-pilot-visa':
            urls.backURL = '#/app-forms/create-pilot-passport';
            urls.nextURL = '#/app-forms/create-pilot-availability';
            return urls;
            break;
          case '/app-forms/create-pilot-availability':
            urls.backURL = '#/app-forms/create-pilot-visa';
            urls.nextURL = '#/app-forms/create-pilot-unavailable-days';
            return urls;
            break;
          case '/app-forms/create-pilot-unavailable-days':
            urls.backURL = '#/app-forms/create-pilot-availability';
            urls.nextURL = '#/app-forms/create-pilot-finish-registration';
            return urls;
            break;
          case '/app-forms/create-pilot-finish-registration':
            urls.backURL = '#/app-forms/create-pilot-unavailable-days';
            urls.nextURL = '';
            return urls;
            break;
          case '/app-forms/edit-pilot-profile':
            urls.backURL = '';
            urls.nextURL = '#/app-forms/edit-pilot-licences';
            return urls;
            break;
          case '/app-forms/edit-pilot-licences':
            urls.backURL = '#/app-forms/edit-pilot-profile';
            urls.nextURL = '#/app-forms/edit-pilot-medical';
            return urls;
            break;
          case '/app-forms/edit-pilot-medical':
            urls.backURL = '#/app-forms/edit-pilot-licences';
            urls.nextURL = '#/app-forms/edit-pilot-flight-hours';
            return urls;
            break;
          case '/app-forms/edit-pilot-flight-hours':
            urls.backURL = '#/app-forms/edit-pilot-medical';
            urls.nextURL = '#/app-forms/edit-pilot-type-rating';
            return urls;
            break;
          case '/app-forms/edit-pilot-type-rating':
            urls.backURL = '#/app-forms/edit-pilot-flight-hours';
            urls.nextURL = '#/app-forms/edit-pilot-international-experience';
            return urls;
            break;
          case '/app-forms/edit-pilot-international-experience':
            urls.backURL = '#/app-forms/edit-pilot-type-rating';
            urls.nextURL = '#/app-forms/edit-pilot-passport';
            return urls;
            break;
          case '/app-forms/edit-pilot-passport':
            urls.backURL = '#/app-forms/edit-pilot-international-experience';
            urls.nextURL = '#/app-forms/edit-pilot-visa';
            return urls;
            break;
          case '/app-forms/edit-pilot-visa':
            urls.backURL = '#/app-forms/edit-pilot-passport';
            urls.nextURL = '#/app-forms/edit-pilot-availability';
            return urls;
            break;
          case '/app-forms/edit-pilot-availability':
            urls.backURL = '#/app-forms/edit-pilot-visa';
            urls.nextURL = '#/app-forms/edit-pilot-unavailable-days';
            return urls;
            break;
          case '/app-forms/edit-pilot-unavailable-days':
            urls.backURL = '#/app-forms/edit-pilot-availability';
            urls.nextURL = '#/app-forms/edit-pilot-finish-registration';
            return urls;
            break;
          case '/app-forms/edit-pilot-finish-registration':
            urls.backURL = '#/app-forms/edit-pilot-unavailable-days';
            urls.nextURL = '';
            return urls;
            break;

          case '/app-forms/create-mechanic-profile':
            urls.backURL = '';
            urls.nextURL = '#/app-forms/create-mechanic-passport';
            return urls;
            break;

          case '/app-forms/create-mechanic-passport':
            urls.backURL = '#/app-forms/create-mechanic-profile';
            urls.nextURL = '#/app-forms/create-mechanic-visa';
            return urls;
            break;

          case '/app-forms/create-mechanic-visa':
            urls.backURL = '#/app-forms/create-mechanic-passport';
            urls.nextURL = '#/app-forms/create-mechanic-availability';
            return urls;
            break;

          case '/app-forms/create-mechanic-availability':
            urls.backURL = '#/app-forms/create-mechanic-visa';
            urls.nextURL = '#/app-forms/create-mechanic-international-experience';
            return urls;
            break;

          case '/app-forms/create-mechanic-international-experience':
            urls.backURL = '#/app-forms/create-mechanic-availability';
            urls.nextURL = '#/app-forms/create-mechanic-professional-experience';
            return urls;
            break;

          case '/app-forms/create-mechanic-professional-experience':
            urls.backURL = '#/app-forms/create-mechanic-international-experience';
            urls.nextURL = '#/app-forms/create-mechanic-unavailable-days';
            return urls;
            break;

          case '/app-forms/create-mechanic-unavailable-days':
            urls.backURL = '#/app-forms/create-mechanic-professional-experience';
            urls.nextURL = '#/app-forms/create-mechanic-finish-registration';
            return urls;
            break;

          case '/app-forms/create-mechanic-finish-registration':
            urls.backURL = '#/app-forms/create-mechanic-unavailable-days';
            urls.nextURL = '';
            return urls;
            break;


          case '/app-forms/edit-mechanic-profile':
            urls.backURL = '';
            urls.nextURL = '#/app-forms/edit-mechanic-passport';
            return urls;
            break;
          case '/app-forms/edit-mechanic-passport':
            urls.backURL = '#/app-forms/edit-mechanic-profile';
            urls.nextURL = '#/app-forms/edit-mechanic-visa';
            return urls;
            break;
          case '/app-forms/edit-mechanic-visa':
            urls.backURL = '#/app-forms/edit-mechanic-passport';
            urls.nextURL = '#/app-forms/edit-mechanic-availability';
            return urls;
            break;

          case '/app-forms/edit-mechanic-availability':
            urls.backURL = '#/app-forms/edit-mechanic-visa';
            urls.nextURL = '#/app-forms/edit-mechanic-international-experience';
            return urls;
            break;

          case '/app-forms/edit-mechanic-international-experience':
            urls.backURL = '#/app-forms/edit-mechanic-availability';
            urls.nextURL = '#/app-forms/edit-mechanic-professional-experience';
            return urls;
            break;

          case '/app-forms/edit-mechanic-professional-experience':
            urls.backURL = '#/app-forms/edit-mechanic-international-experience';
            urls.nextURL = '#/app-forms/edit-mechanic-unavailable-days';
            return urls;
            break;

          case '/app-forms/edit-mechanic-unavailable-days':
            urls.backURL = '#/app-forms/edit-mechanic-professional-experience';
            urls.nextURL = '#/app-forms/edit-mechanic-finish-registration';
            return urls;
            break;

          case '/app-forms/edit-mechanic-finish-registration':
            urls.backURL = '#/app-forms/edit-mechanic-unavailable-days';
            urls.nextURL = '';
            return urls;
            break;


          case '/app-forms/create-flight-attendant-profile':
            urls.backURL = '';
            urls.nextURL = '#/app-forms/create-flight-attendant-passport';
            return urls;
            break;
          case '/app-forms/create-flight-attendant-passport':
            urls.backURL = '#/app-forms/create-flight-attendant-profile';
            urls.nextURL = '#/app-forms/create-flight-attendant-visa';
            return urls;
            break;
          case '/app-forms/create-flight-attendant-visa':
            urls.backURL = '#/app-forms/create-flight-attendant-passport';
            urls.nextURL = '#/app-forms/create-flight-attendant-availability';
            return urls;
            break;
          case '/app-forms/create-flight-attendant-availability':
            urls.backURL = '#/app-forms/create-flight-attendant-visa';
            urls.nextURL = '#/app-forms/create-flight-attendant-international-experience';
            return urls;
            break;
          case '/app-forms/create-flight-attendant-international-experience':
            urls.backURL = '#/app-forms/create-flight-attendant-availability';
            urls.nextURL = '#/app-forms/create-flight-attendant-professional-experience';
            return urls;
            break;
          case '/app-forms/create-flight-attendant-professional-experience':
            urls.backURL = '#/app-forms/create-flight-attendant-international-experience';
            urls.nextURL = '#/app-forms/create-flight-attendant-unavailable-days';
            return urls;
            break;
          case '/app-forms/create-flight-attendant-unavailable-days':
            urls.backURL = '#/app-forms/create-flight-attendant-professional-experience';
            urls.nextURL = '#/app-forms/create-flight-attendant-finish-registration';
            return urls;
            break;
          case '/app-forms/create-flight-attendant-finish-registration':
            urls.backURL = '#/app-forms/create-flight-attendant-unavailable-days';
            urls.nextURL = '';
            return urls;
            break;
          case '/app-forms/edit-flight-attendant-profile':
            urls.backURL = '';
            urls.nextURL = '#/app-forms/edit-flight-attendant-passport';
            return urls;
            break;
          case '/app-forms/edit-flight-attendant-passport':
            urls.backURL = '#/app-forms/edit-flight-attendant-profile';
            urls.nextURL = '#/app-forms/edit-flight-attendant-visa';
            return urls;
            break;
          case '/app-forms/edit-flight-attendant-visa':
            urls.backURL = '#/app-forms/edit-flight-attendant-passport';
            urls.nextURL = '#/app-forms/edit-flight-attendant-availability';
            return urls;
            break;
          case '/app-forms/edit-flight-attendant-availability':
            urls.backURL = '#/app-forms/edit-flight-attendant-visa';
            urls.nextURL = '#/app-forms/edit-flight-attendant-international-experience';
            return urls;
            break;
          case '/app-forms/edit-flight-attendant-international-experience':
            urls.backURL = '#/app-forms/edit-flight-attendant-availability';
            urls.nextURL = '#/app-forms/edit-flight-attendant-professional-experience';
            return urls;
            break;
          case '/app-forms/edit-flight-attendant-professional-experience':
            urls.backURL = '#/app-forms/edit-flight-attendant-international-experience';
            urls.nextURL = '#/app-forms/edit-flight-attendant-unavailable-days';
            return urls;
            break;
          case '/app-forms/edit-flight-attendant-unavailable-days':
            urls.backURL = '#/app-forms/edit-flight-attendant-professional-experience';
            urls.nextURL = '#/app-forms/edit-flight-attendant-finish-registration';
            return urls;
            break;
          case '/app-forms/edit-flight-attendant-finish-registration':
            urls.backURL = '#/app-forms/edit-flight-attendant-unavailable-days';
            urls.nextURL = '';
            return urls;
            break;
        }
      }
    }
  })


  .factory('microRouter', function ($location, simpleStorage, $rootScope, localStorageService) {
    return {
      set: function (role, finished_registration) {
        switch (role) {
          case 'pilot':
            (finished_registration) ? $location.path('app-pilot/home'): $location.path('app-forms/create-pilot-profile');
            break;
          case 'aircraft owner':
            (finished_registration) ? $location.path('app-aom/aom-home'): $location.path('app-forms/create-aom');
            break;
          case 'mechanic':
            (finished_registration) ? $location.path('app-mechanic/home'): $location.path('app-forms/create-mechanic-profile');
            break;
          case 'flight attendant':
            (finished_registration) ? $location.path('app-flight-attendant/home'): $location.path('app-forms/create-flight-attendant-profile');
            break;
          default:
            $location.path('/');
        }
      }
    }
  });
