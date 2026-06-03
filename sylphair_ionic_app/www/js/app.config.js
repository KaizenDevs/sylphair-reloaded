angular.module('sylphairApp.config', [])
angular.module('sylphairApp.config')
.config(
  ['$httpProvider', '$ionicConfigProvider', 'localStorageServiceProvider',
  function ($httpProvider, $ionicConfigProvider, localStorageServiceProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false)
    $ionicConfigProvider.backButton.text('')
    $ionicConfigProvider.views.swipeBackEnabled(false)
    localStorageServiceProvider
      .setPrefix('sylphairApp')
      .setNotify(true, true)
    $httpProvider.interceptors.push('authHttpRequestInterceptor')
    $httpProvider.interceptors.push('checkInternetInterceptor')
  }])
