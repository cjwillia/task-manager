resources.factory("Profile", ["$resource", function($resource) {
  //TODO this simply won't do.
  return $resource('/profile/:userId', {userId:'@id'});
}]);
