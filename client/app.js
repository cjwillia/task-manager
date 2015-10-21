var app = angular.module("app", [
	"ngMaterial",
	"resources",
	"login",
	"profile",
	"toolbars"
]);

app.config(["$mdThemingProvider", function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('blue-grey')
		.accentPalette('blue')
		.warnPalette('red')
		.backgroundPalette('light-blue');
}]);
