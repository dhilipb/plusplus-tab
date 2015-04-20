var App = angular.module('App')
    // Web Local Storage Cache Manager
    .service('Cache', function() {
        var Cache = {}
        Cache.check = function(source, scope) {
            var longEnoughTimeAgo = (new Date).getTime() - 3e5;
            var lastFetchDate = scope.sources[source]['lastFetched']
            return lastFetchDate > longEnoughTimeAgo;
        };
        Cache.setLastFetched = function(source, scope) {
            scope.sources[source]['lastFetched'] = (new Date).getTime();
        };
        Cache.clear = function(source, scope) {
            scope.posts[source] = [];
        }
        return Cache;
    })
;
