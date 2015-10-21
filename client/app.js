var app = angular.module("app", [
	"ngMaterial",
	"resources",
	"login",
	"profile",
	"toolbar"
]);

app.config(["$mdThemingProvider", function($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('blue-grey')
		.warnPalette('red');
}]);
