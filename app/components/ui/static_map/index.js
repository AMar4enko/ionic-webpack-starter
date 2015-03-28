STATIC_API_ENDPOINT = 'http://maps.googleapis.com/maps/api/staticmap';
var _ = require('lodash');
var StaticMap = angular.module('app.ui.staticMap', [
  require('../../utils/cached_image_loader')
]);
var templateUrl = require('./static_map.html');

module.exports = StaticMap.name;

require('./static_map.scss');

StaticMap.directive('staticGoogleMap', StaticGoogleMapDirectiveProvider);

function StaticGoogleMapDirectiveProvider ($timeout, CachedImageLoader){
  return {
    restrict: 'E',
    scope: {
      markers: '&markers',
      center: '&center',
      zoom: '&zoom'
    },
    templateUrl: templateUrl,
    replace: true,
    transclude: true,
    link: linkFn
  };

  function linkFn ($scope, iElem, iAttrs){

    var timerId = $timeout(setMapLoading, 100);
    var clientRect = iElem[0].getBoundingClientRect();
    var markers = $scope.markers();
    var center = $scope.center();
    var zoom = $scope.zoom();

    if(!(markers || center)){
      throw 'Error initializing static Google Map - you need to provide either markers or center';
    }

    CachedImageLoader(STATIC_API_ENDPOINT + '?' + buildParams())
      .then(function (imageSrc){
        $timeout.cancel(timerId);
        $scope.mapImageUrl = imageSrc;
        $timeout(function(){
          $scope.loaded = true;
        },100);
      });

    function setMapLoading (){
      $scope.loading = true;
    }

    function buildParams (){
      var paramStr = 'size='+clientRect.width.toFixed(0)+'x'+clientRect.height.toFixed(0);
      if(markers){
        paramStr += '&markers=' + _.map(markers, function (marker) {
          return _.map(marker, function (v, k){
              if(k == 'location'){
                return locationParam(v);
              }
              return k+':'+v;
            }).join('|');
        }).join('&markers=');
      }else{
        paramStr += '&center='+locationParam(center);
      }

      if(zoom) paramStr += '&zoom='+zoom;

      return paramStr;
    }

    function locationParam (location){
      if(_.isArray(location)){
        return '' + location[0] + ',' + location[1];
      }
      return location.lat + ',' + location.lng;
    }
  }
}
