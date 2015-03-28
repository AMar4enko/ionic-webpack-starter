var _ = require('lodash');
var directiveTemplateUrl = require('./shrinkable_image_header.html');

module.exports = ShrinkableImageHeaderProvider;

/**
 * @ngInject
 * @constructor
 */
function ShrinkableImageHeaderProvider ($parse){
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: directiveTemplateUrl,
    scope: {
      imageUrl: '=imageUrl'
    },
    replace: true,
    link: function ($scope, $element, $attr){
      var minHeaderHeight = $attr.minHeight ? $scope.$eval($attr.minHeight) : 0;
      var content = angular.element($element.parent()[0].querySelectorAll('ion-content'));

      content.bind('scroll', manageScroll($element,minHeaderHeight))
    }
  };

  function shrink(header, threshold, minThreshold, amt, dir) {
    ionic.requestAnimationFrame(function() {
      // Threshold is equal to bar-height

      amt = Math.max(minThreshold, threshold - amt);
      amt = Math.min(threshold * 1.3, amt);
      amt = amt < 0 ? 0 : amt;
      // Re-position the header
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' + (threshold-amt) + 'px, 0)';
    });
  }

  function manageScroll ($headerImageElement, minThreshold){
    var
      elem = $headerImageElement[0],
      threshold = elem.getBoundingClientRect().height, prev = 0, prevDir = 0, dir = 1, prevShrinkAmt = 0, starty = 0;
    return function (e){
      var delta;
      // Scroll delta
      delta = e.detail.scrollTop - prev;
      prev = e.detail.scrollTop;

      dir = delta >= 0 ? 1 : -1;
      if(dir !== prevDir) starty = e.detail.scrollTop;

      if(dir === 1){
        // Calculate expansion amount
        //shrinkAmt = prevShrinkAmt - Math.min(threshold, (starty - e.detail.scrollTop));
        shrink(elem, threshold, minThreshold, e.detail.scrollTop, dir);
      }else{
        shrink(elem, threshold, minThreshold, e.detail.scrollTop, dir);
      }

    };

  }
}