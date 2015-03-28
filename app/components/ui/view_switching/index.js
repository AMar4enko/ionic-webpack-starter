var ViewSwitching = angular.module('app.ui.view-switching', [
  require('../loading')
]);
var _ = require('lodash');

module.exports = ViewSwitching.name;

ViewSwitching.service('ViewSwitching', ViewSwitchingService);

function ViewSwitchingService ($state, $ionicViewSwitcher, $ionicHistory, LoadingPopup){
  this.goTo = goToState;

  function goToState (newState, params, direction, options){
    direction = direction || 'forward';
    options = options || {};


    if($state.current.name == newState){
      if(!params || _.isEmpty(params)){
        return;
      }
    }

    if(options.root){
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
    }

    if(direction){
      $ionicViewSwitcher.nextDirection(direction);
    }

    LoadingPopup(options.popupText || 'Loading');

    $state.go(newState, params);
  }
}
