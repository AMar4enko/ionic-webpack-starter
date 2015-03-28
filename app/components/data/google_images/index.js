var GoogleImagesData = angular.module('app.data.googleImages', [
  require('../store')
]);

module.exports = GoogleImagesData.name;

var imageResource;

GoogleImagesData.run(function (DataStore){
  imageResource = DataStore.defineResource({
    name: 'GoogleImage',
    basePath: 'http://ajax.googleapis.com/ajax/services/search',
    endpoint: '/images?v=1.0',
    idAttribute: 'imageId'
  });
});

GoogleImagesData.factory('GoogleImages', function (){
  return imageResource;
});