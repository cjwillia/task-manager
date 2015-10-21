var login = angular.module('login', ["ngMaterial", "ngRoute"]);

login.config(function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'LoginController'
    });
});

login.controller("LoginController", ["$scope", "$mdToast", "User", function($scope, $mdToast, User) {
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
