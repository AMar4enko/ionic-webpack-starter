var ImgCache = require('imgcache.js');
var CachedImageLoader = angular.module('app.utils.cachedImageLoader', []);

module.exports = CachedImageLoader.name;

CachedImageLoader.factory('CachedImageLoader', function($q){
    var initDefer = $q.defer();
    ImgCache.options.debug = true;
    ImgCache.options.chromeQuota = 50*1024*1024;
    ImgCache.init(initDefer.resolve, initDefer.reject);
    return function(src){
      return initDefer.promise.then(function(){
        var defer = $q.defer();
        ImgCache.isCached(src, function(_src, cached){
          if(cached){
            ImgCache.getCachedFileURL(src, function(originalUrl, cachedFileUrl){
              defer.resolve(cachedFileUrl);
            }, defer.reject);
            return;
          }
          ImgCache.cacheFile(src, function(){
            ImgCache.getCachedFileURL(src, function(originalUrl, cachedFileUrl){
              defer.resolve(cachedFileUrl);
            }, defer.reject);
          }, defer.reject, defer.notify);
        });
        return defer.promise;
      });
    };
  });
