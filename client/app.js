var app = angular.module("app", ["ngMaterial"]);

app.controller("LoginController", ["$scope", function($scope) {
	$scope.sendUserInfo = function() {
		console.log("User Info Send was called for ", $scope.user.name);
	}

	$scope.sendNewUserInfo = function() {
		console.log("New User Info Send was called for ", $scope.newUser.name);
	}
}]);