resources.factory("Profile", ["$resource", function($resource) {
  return $resource('/profile', {}, {
      query: {method: "GET", url: '/profiles', isArray: true}
  });
}]);
