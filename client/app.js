var app = angular.module("app", [
	"ngMaterial",
	"resources",
	"login",
	"toolbar"
]);

app.config(["$mdThemingProvider", function($mdThemingProvider) {
	$mdThemingProvider.theme('default');
}]);
