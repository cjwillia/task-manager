var profile = angular.module("profile", ["ngMaterial", "ngRoute"]);

profile.config(["$routeProvider", function($routeProvider) {
	$routeProvider
	.when("/profile-select", {
		templateUrl: "profile.html"
	});
}]);

profile.controller("ProfileController", ["$scope", "$mdToast", "Profile", function($scope, $mdToast, Profile) {
	$scope.test = function() {
		//todo
	}
}]);
