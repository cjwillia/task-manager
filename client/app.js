var app = angular.module("app", ["ngMaterial", "ngResource", "ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'LoginController'
		})
		.when('/profile', {
			templateUrl: 'profile.html',
			controller: 'ProfileController'
		})
		.otherwise({
			redirectTo: '/login'
		});
});

app.factory("User", ["$resource", function($resource) {
	return $resource('/user', {}, {
		login: {method: 'POST', url: '/login' }
	});
}]);

app.factory("Profile", ["$resource", function($resource) {
	return $resource('/profile/:userId', {userId:'@id'});
}]);

app.controller("LoginController", ["$scope", "$mdToast", "User", function($scope, $mdToast, User) {
	$scope.newUser = null;
	$scope.user = new User();

	$scope.prepNewUser = function() {
		if(!$scope.newUser)
			$scope.newUser = new User();
	}

	$scope.sendUserInfo = function() {
		$scope.user.$login().then(function() {
			$mdToast.show($mdToast.simple().content("WHOOO"));
		}, function() {
			$mdToast.show($mdToast.simple().content("try again fgt."));
		});
	}

	$scope.sendNewUserInfo = function() {
		var u = $scope.newUser;
		if(u.password !== u.passwordConfirm) {
			$mdToast.show($mdToast.simple().content("Passwords do not match"));
			return;
		}
		u.$save().then(function() {
			$mdToast.show($mdToast.simple().content("User Saved!"));
		}, function(err) {
			$mdToast.show($mdToast.simple().content(err));
		});
	}
}]);

app.controller("ProfileController", ["$scope", "$mdToast", "Profile", function($scope, $mdToast, Profile) {
	$scope.test = function() {
		//todo
	}
}]);
