angular.module('sylphairApp.constants', [])
  .constant('APP_INFO', {
    'VERSION': '2.1.24'
  })
  .constant('CONFIG', {
    'COMPLETE_API_URL': 'https://api.sylphairaviation.com',
    'PRIVACY_LINK': 'http://sylphairaviation.com/terms-and-privacy.html'
  })
  .constant('CAMERA_OPTIONS', {
    quality: 75,
    allowEdit: true,
    encodingType: 0,
    destinationType: 0,
    targetWidth: 300,
    targetHeight: 300,
    saveToPhotoAlbum: false
  })
  .constant('PUSHER_KEY', '' /* configure via window.PUSHER_KEY */)
