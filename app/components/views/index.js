var Views = angular.module('app.views', [
  require('./google_images'),
  require('../ui/fake_tabs')
]);
var slideMenuTemplate = require('./tabs.jade');

module.exports = Views.name;

Views.config(function ($stateProvider){
  $stateProvider.state(
    'app',
    {
      url: '',
      abstract: true
    }
  ).state(
    'app.tabs',
    {
      url: '/tabs',
      abstract: true,
      views: {
        '@': {
          templateUrl: slideMenuTemplate
        }
      }
    }
  );
});
