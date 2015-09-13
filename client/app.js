var app = angular.module("app", ["ngMaterial", "ngResource"]);

app.factory("User", ["$resource", function($resource) {
	return $resource('/user');
}]);

app.controller("LoginController", ["$scope", "User", function($scope, User) {
	$scope.newUser = null;

	$scope.prepNewUser = function() {
		if(!$scope.newUser)
			$scope.newUser = new User();
	}

	$scope.sendUserInfo = function() {
		console.log("User Info Send was called for ", $scope.user.name);
	}

	$scope.sendNewUserInfo = function() {
		$scope.newUser.$save().then(function() {
			console.log('relative success!');
		}, function(err) {
			console.log('error', err);
		});
	}
}]);