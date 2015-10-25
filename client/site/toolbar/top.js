toolbars.directive('topToolbar', function() {
    return {
        templateUrl: "/site/toolbar/top.html",
        link: function(scope, element, attrs, controller) {
            console.log('post-link!');
        }
    };
});
