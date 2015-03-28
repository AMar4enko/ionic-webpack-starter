'use strict';

var
  angular = require('angular'),
  templates = require('./templates'),
  bootstrap = require('./components/bootstrap');

var appModule = module.exports = angular
  .module('ionic-webpack', [
    bootstrap.name,
    require('angular-router-exception-handler'),
    require('./env/'+NODE_ENV),
    require('./components/views'),
    templates
  ])
  .constant('version', require('../package.json').version)
  .constant('config', require('./config'))
  .config(function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|filesystem|file):/);
    $compileProvider.aHrefSanitizationWhitelist(
      /^\s*(https?|ftp|mailto|file|tel):/);
  });

// Add the styles to the page
require('./index.scss');

// Patching angular + angular-animate error with transcluding comment element
require('./jqlite_animate_comment_patch')(angular.element);

bootstrap.ionicBootstrap(appModule, global, {
  fonts: ['Comfortaa']
});

