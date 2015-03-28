var SubheaderSlider = angular.module('app.ui.subheaderSlider', []);

module.exports = SubheaderSlider.name;

require('./subheader_pane.scss');

SubheaderSlider.directive('subheaderPane', require('./subheader_pane_directive'));
SubheaderSlider.directive('showSubheaderPane', require('./show_subheader_pane_directive'));
SubheaderSlider.directive('subheaderPaneContent', require('./subheader_pane_content_directive'));
