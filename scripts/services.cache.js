var App = angular.module('App')
    // Web Local Storage Cache Manager
    .service('Cache', function($localStorage) {
        var Cache = {}
        Cache.check = function(source) {
            var longEnoughTimeAgo = (new Date).getTime() - 1e5;
            var lastFetchDate = $localStorage.sources[source]['lastFetched']
            return lastFetchDate > longEnoughTimeAgo;
        };
        Cache.setLastFetched = function(source) {
            $localStorage.sources[source]['lastFetched'] = (new Date).getTime();
        };
        Cache.clear = function(source) {
            count = 0
            for (s in $localStorage.posts) {
                post = $localStorage.posts[s];

                if (post['source'] == source) {
                    console.log("Removing " + source);
                    delete $localStorage.posts[s];
                }
            }
            $localStorage.posts.clean(void 0);
        }
        return Cache;
    })
;
