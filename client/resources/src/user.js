resources.factory("User", ["$resource", function($resource) {
    return $resource('/user', {}, {
        login: {
            method: 'POST',
            url: '/login'
        },
        logout: {
            method: 'DELETE',
            url: '/login'
        }
    });
}]);
