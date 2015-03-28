var GoogleImages = angular.module('app.views.googleImages', [
  require('../../data/google_images')
]);

var GoogleImagesController = require('./controllers/google_images_controller');
var template = require('./google_images.jade');

module.exports = GoogleImages.name;

GoogleImages.controller('GoogleImagesController', GoogleImagesController);

GoogleImages.config(function ($stateProvider){
  $stateProvider.state(
    'app.tabs.googleImages',
    {
      url: '/google-images',
      resolve: GoogleImagesController.resolve,
      views: {
        '@app.tabs': {
          templateUrl: template,
          controller: 'GoogleImagesController as googleImages'
        }
      }
    }
  )
});