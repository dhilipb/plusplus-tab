var App = angular.module('App', ['dcbImgFallback', 'ngStorage']);
App
    .controller('NewsController', function($scope, Retriever, Feed, $localStorage, $sessionStorage) {

        // Bind data to local storage
        $localStorage.$default({
            posts: [],
            sources: Sources
        });
        $scope.posts = $localStorage.posts;
        $scope.sources = $localStorage.sources;

        // TODO: Hacky, need to research for the best way
        Feed.setScope($scope);
        Retriever.setScope($scope);

        // Retreive all the fantastic feeds!!
        Retriever.fetchPosts("HackerNews", Feed.HackerNews);
        Retriever.fetchPosts("ProductHunt", Feed.ProductHunt);
        Retriever.fetchPosts("Reddit", Feed.Reddit);
        Retriever.fetchPosts("DesignerNews", Feed.DesignerNews);

        $scope.toggleSource = function(source) {
            source.enabled = !source.enabled;
        }

        // Watch for updates from other tabs
        // Can be done via background.js too..
        $scope.$watch(function() {
            return $localStorage;
        }, function(newVal, oldVal) {
            if (oldVal != newVal) {
                $scope.sources = $localStorage.sources;
                $scope.posts = $localStorage.posts;
            }
        }, true);

    });


// Order by filter
App.filter('orderObjectBy', function() {
    return function(input, attribute) {
        if (!angular.isObject(input)) return input;

        var array = [];
        for (var objectKey in input) {
            array.push(input[objectKey]);
        }

        array.sort(function(a, b) {
            a = parseInt(a[attribute]);
            b = parseInt(b[attribute]);
            return b - a;
        });
        return array;
    }
});

// Google analytics shizzle
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-163217-15']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
