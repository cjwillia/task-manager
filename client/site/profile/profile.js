var profile = angular.module("profile", ["ngMaterial", "ngRoute"]);

profile.config(["$routeProvider", function($routeProvider) {
	$routeProvider
	.when("/profile-select", {
		templateUrl: "/site/profile/profile-select.html"
	})
	.when("/profile", {
		templateUrl: "/site/profile/profile.html"
	});
}]);

profile.controller("ProfileController", ["$scope", "$mdToast", "Profile", function($scope, $mdToast, Profile) {
	$scope.test = function() {
		//todo
	}
}]);

profile.controller("ProfileSelectController", ["$scope", "$mdToast", "Profile", function($scope, $mdToast, Profile) {
	console.log("Hello, world!");
}]);
