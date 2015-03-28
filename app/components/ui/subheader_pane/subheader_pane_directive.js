var templateUrl = require('./subheader_pane.html');

module.exports = SubheaderPaneDirectiveProvider;

function SubheaderPaneDirectiveProvider (){
  return {
    restrict: 'E',
    templateUrl: templateUrl,
    replace: true,
    transclude: true,
    controller: SubheaderPaneController,
    priority: 999999,
    compile: compile
  };

  function compile (){
    return {
      post: linkFn
    }
  }

  function linkFn ($scope, iElem, iAttrs, ctrl, transcludeFn){
    var sliderPane = angular.element(iElem[0].querySelector('subheader-pane-content'));
    sliderPane.detach();
    iElem.parent().prepend(sliderPane);
    $scope.$$postDigest(function (){
      ctrl.init();
    });
  }
}

function SubheaderPaneController ($scope, $element, $attrs){
  var content, elem = $element[0];
  this.show = _.partial(showHide, true);

  this.hide = _.partial(showHide, false);

  this.showHide = showHide;

  function showHide (show, animate){
    var height;

    animate = _.isUndefined(animate) ? true : animate;

    //
    //_.each($element.children(), function (children){
    //  if(animate) {
    //    children.style[ionic.CSS.TRANSITION] = 'all 0.5s ease-in';
    //  }else{
    //    children.style[ionic.CSS.TRANSITION] = '';
    //  }
    //});
    //
    //if(animate) {
    //  elem.style[ionic.CSS.TRANSITION] = 'all 0.5s ease-in';
    //}else{
    //  elem.style[ionic.CSS.TRANSITION] = '';
    //}
    //
    //if(show){
    //  elem.style[ionic.CSS.TRANSFORM] = 'translate3d(0,0,0)';
    //  _.each($element.children(), function (children){
    //    children.style['opacity'] = '1';
    //  });
    //}else{
    //  _.each($element.children(), function (children){
    //    children.style['opacity'] = '0';
    //  });
    //  height = elem.getBoundingClientRect().height;
    //  elem.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' +  height + 'px, 0)';
    //}

    content.showHide(show, animate);
    if($attrs.onPaneToggle) $scope.$eval($attrs.onPaneToggle, {$visible: show});
  }

  this.init = function (){
    content && content.hide();
  };

  this.setContent = function (_content){
    content = _content;
  };
}


