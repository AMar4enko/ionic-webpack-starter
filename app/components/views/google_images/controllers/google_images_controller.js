module.exports = GoogleImagesController;

function GoogleImagesController (GoogleImages){
  var vm = this;
  GoogleImages.findAll({q: 'habrahabr', start: 0, rsz: 8}).then(function (items){
    vm.items = items;
  });
}

GoogleImagesController.resolve = {

};