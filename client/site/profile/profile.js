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
	};
}]);

profile.controller("ProfileSelectController", ["$scope", "$mdToast", "Profile", function($scope, $mdToast, Profile) {
	$scope.profiles = Profile.query();

	$scope.create = function() {
		//BY NO MEANS FINAL
		var profile = new Profile();
		profile.name = "TestProfile";
		profile.$save(function(p) {
			if(p){
				$mdToast.show($mdToast.simple().content("Profile Created."));
				$scope.profiles = Profile.query();
			}
			else {
				$mdToast.show($mdToast.simple().content("Failed to create profile"));
			}
		});
	};
}]);
