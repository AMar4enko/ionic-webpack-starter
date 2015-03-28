var _ = require('lodash');
var templateUrl = require('./subheader_pane_content.html');
module.exports = SubheaderPaneContentDirectiveProvider;


function SubheaderPaneContentDirectiveProvider (){
  return {
    restrict: 'E',
    templateUrl: templateUrl,
    transclude: true,
    require: ['^subheaderPane','subheaderPaneContent'],
    controller: SubheaderPaneContentController,
    link: preLinkFn
  };

  function preLinkFn ($scope, iElem, iAttrs, controllers, transcludeFn) {
    var subheaderPane = controllers[0];
    var paneContent = controllers[1];
    subheaderPane.setContent(paneContent);
    transcludeFn(function (clone){
      var ionContent = angular.element(iElem[0].querySelector('ion-content'));
      _.each(iElem[0].attributes, function (value) {
        if(value.name == 'class'){
          ionContent.addClass(value.value);
        }else{
          ionContent.attr(value.name, value.value);
        }
        iElem.removeAttr(value.name);
      });
    });
  }

  function postLinkFn ($scope, iElem, iAttrs, controllers, transcludeFn) {

  }
}


function SubheaderPaneContentController ($element){
  this.show = _.partial(showHide, true);

  this.hide = _.partial(showHide, false);

  this.showHide = showHide;

  function showHide (show, animate){
    var ionContent = $element[0].querySelector('ion-content');
    var scroll = angular.element(ionContent).children()[0];
    var height;
    if(animate) {
      ionContent.style[ionic.CSS.TRANSITION] = 'all 0.5s ease-in';
    }else{
      ionContent.style[ionic.CSS.TRANSITION] = '';
    }

    ionContent.style['z-index'] = '10';

    if(show){
      ionContent.style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
    }else{
      height = ionContent.getBoundingClientRect().height;
      ionContent.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' +  height + 'px, 0)';
    }
  }
}
