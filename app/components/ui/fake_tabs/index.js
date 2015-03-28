var FakeTabs = angular.module('app.ui.fakeTabs', []);
var tabsTemplateUrl = require('./fake_tabs.html');
var tabTemplateUrl = require('./fake_tab.html');

module.exports = FakeTabs.name;

FakeTabs.directive('ionFakeTabs', FakeTabsProvider);
FakeTabs.directive('ionFakeTab', FakeTabProvider);
/**
 * @ngInject
 * @constructor
 */
function FakeTabsProvider (){
  return {
    restrict: 'E',
    controller: FakeTabsController,
    templateUrl: tabsTemplateUrl,
    require: 'ionFakeTabs',
    transclude: true,
    replace: true,
    compile: function (tElem, tAttrs){
      return {
        pre: function ($scope, iElem, iAttrs, fakeTabsCtrl){
          $scope.tabs = fakeTabsCtrl;
          if(ionic.Platform.isAndroid()){
            iElem.children().addClass('tabs-top tabs-striped');
          }
        },
        post: function ($scope, iElem, iAttrs, fakeTabsCtrl){
          var navView = angular.element(iElem[0].querySelectorAll('ion-nav-view'));
          iElem.append(navView.detach());
        }
      }
    }
  };
}

/**
 * @ngInject
 * @constructor
 */
function FakeTabProvider ($state, $rootScope, $ionicHistory, $ionicViewSwitcher){
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: tabTemplateUrl,
    scope: true,
    compile: function (tElem, tAttrs){
      return {
        post: function ($scope, iElem, iAttrs){
          var cancelListener = $rootScope.$on('$stateChangeSuccess', checkActiveState);

          $scope.active = false;
          $scope.hasIcon = !!iAttrs.icon;
          $scope.iconClasses = $scope.hasIcon ? iAttrs.icon : null;
          $scope.generateHref = generateHref;
          $scope.prepareViewSwitch = prepareViewSwitch;

          $scope.$on('$destroy', cancelListener);

          checkActiveState();

          function checkActiveState (){
            $scope.active = $state.current.name == iAttrs.sref;
          }

          function generateHref (){
            return $state.href(iAttrs.sref, iAttrs.srefParams ? $scope.$eval(iAttrs.srefParams) : null);
          }

          function prepareViewSwitch (){
            if(iAttrs.root){
              $ionicHistory.nextViewOptions({
                historyRoot: true
              });
            }
            $ionicViewSwitcher.nextDirection(iAttrs.direction || 'forward');
          }
        }
      };
    }
  };
}

/**
 * @ngInject
 * @param $scope
 * @param $attrs
 * @constructor
 */
function FakeTabsController ($scope, $attrs){
  var platformClasses = [];
  var colorClasses = [];
  var contentClasses = [];

  if($attrs.color) colorClasses.push('tabs-color-'+$attrs.color);
  if($attrs.background) colorClasses.push('tabs-background-'+$attrs.background);

  if(ionic.Platform.isAndroid()){
    $scope.$hasTabsTop = true;
  }else{
    $scope.$hasTabs = true;
  }

  this.classes = [].concat(platformClasses, colorClasses);

  this.getViewClasses = function (){
    return contentClasses;
  }
}
