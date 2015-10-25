var login = angular.module('login', ["ngMaterial", "ngRoute"]);

login.config(["$routeProvider", function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: '/site/login/login.html'
    })
    .otherwise({
      templateUrl: '/site/login/login.html'
    });
}]);

login.controller("LoginController", ["$scope", "$mdToast", "User", "$location", function($scope, $mdToast, User, $location) {
	$scope.newUser = null;
	$scope.user = new User();

	$scope.prepNewUser = function() {
		if(!$scope.newUser)
			$scope.newUser = new User();
	};

	$scope.sendUserInfo = function() {
		$scope.user.$login().then(function() {
			$mdToast.show($mdToast.simple().content("Logged in successfully"));
      $location.path("/profile-select");
		}, function(err) {
      console.log(err);
			$mdToast.show($mdToast.simple().theme('default').content(err.data.error));
		});
	};

	$scope.sendNewUserInfo = function() {
		var u = $scope.newUser;
		if(u.password !== u.passwordConfirm) {
			$mdToast.show($mdToast.simple().content("Passwords do not match"));
			return;
		}
		u.$save().then(function() {
			$mdToast.show($mdToast.simple().content("User Saved!"));
		}, function(err) {
			$mdToast.show($mdToast.simple().theme('default').content(err.data.error));
		});
	};
}]);
