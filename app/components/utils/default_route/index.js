var DefaultRouteModule = angular.module('app.utils.defaultRoute', ['ionic', 'ui.router']);

module.exports = DefaultRouteModule.name;

DefaultRouteModule.config(function ($urlRouterProvider){
  $urlRouterProvider.otherwise(defaultUrl);

  function defaultUrl ($inject){
    return $location.replace().url('/signin');
  }
});
