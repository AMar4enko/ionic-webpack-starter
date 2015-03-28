module.exports = ShowSubheaderPaneDirectiveProvider;

function ShowSubheaderPaneDirectiveProvider (){
  return {
    restrict: 'A',
    require: '^subheaderPane',
    link: function ($scope, iElem, iAttrs, subheaderPane){
      iElem.bind('click', function (event){
        $scope.$apply(function (){
          subheaderPane.showHide(iAttrs.showSubheaderPane && $scope.$eval(iAttrs.showSubheaderPane));
        });
      });
    }
  }
}
