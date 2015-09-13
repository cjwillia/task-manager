var app = angular.module("app", ["ngMaterial", "ngResource"]);

app.factory("User", ["$resource", function($resource) {
	return $resource('/user');
}]);

app.controller("LoginController", ["$scope", "$mdToast", "User", function($scope, $mdToast, User) {
	$scope.newUser = null;

	$scope.prepNewUser = function() {
		if(!$scope.newUser)
			$scope.newUser = new User();
	}

	$scope.sendUserInfo = function() {
		console.log("User Info Send was called for ", $scope.user.name);
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