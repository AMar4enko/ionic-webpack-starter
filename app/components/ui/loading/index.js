require('./spinner.scss');

var Loading = angular.module('app.ui.loading', []);
var loadingTemplateUrl = require('./loading.html');

module.exports = Loading.name;

Loading.factory('LoadingPopup', LoadingPopupFactory);

Loading.run(function ($rootScope, $ionicLoading){
  $rootScope.$on('$stateChangeError', $ionicLoading.hide.bind($ionicLoading));
});

/**
 * @ngInject
 * @constructor
 * @param $ionicLoading
 * @param $rootScope
 * @param $sce
 */
function LoadingPopupFactory ($ionicLoading, $rootScope, $sce){
  var loadingScope = $rootScope.$new(true);

  return function (loadingMessage){
    loadingScope.$message = $sce.trustAsHtml(loadingMessage);
    $ionicLoading.show({
      templateUrl: loadingTemplateUrl,
      hideOnStateChange: true,
      scope: loadingScope
    });

    return function (){
      $ionicLoading.hide();
    }
  }
}
