var App = angular.module('App')

// Retrieve JSON/Oauth
.service('Retriever', function($http, Cache, OAuth) {

    var scope = null;
    var Retriever = {};

    Retriever.setScope = function(sc) {
        scope = sc;
    }
    Retriever.fetchJSON = function(source, callback, fallback) {
        var jsonUrl = void 0 == fallback ? Sources[source]['url'] : Sources[source]['fallback'];

        $http({
            method: 'GET',
            url: jsonUrl,
            headers: {
                'Content-type': 'application/json'
            },
            timeout: 5000
        })
        .success(function(data) {
            if (data == null) {
                if (void 0 != Sources[source]['fallback']) {
                    console.log("Trying fallback URL");
                    Retreiver.fetchJSON(source, callback, true);
                }
            } else {
                Cache.setLastFetched(source, scope);
                callback(source, data);
                scope.sources[source]['loading'] = false;
            }
        })
        .error(function() {
            console.log("Could not retrieve " + source + " feed");
            scope.sources[source]['loading'] = false;

            if (void 0 != Sources[source]['fallback']) {
                console.log("Trying fallback URL");
                Retriever.fetchJSON(source, callback, true);
            }
        });
    };
    Retriever.fetchOAuth = function(source, callback) {
        OAuth.request("GET", "/posts", {
            days_ago: 0
        }, function(err, data) {
            if (err || !data || !data.posts || !data.posts.length) {
                console.log("No result received");
                return;
            }

            var postGroup = {
                day: data.posts[0].day,
                posts: data.posts
            };

            Cache.setLastFetched(source, scope);
            scope.sources[source]['loading'] = false;

            callback(source, postGroup);
        })
    };
    Retriever.fetchPosts = function(source, callback) {
        if (!Cache.check(source, scope)) {

            Cache.clear(source, scope);
            scope.sources[source]['loading'] = true;

            if (Sources[source]['auth'] == "OAuth") {
                Retriever.fetchOAuth(source, callback);
            } else {
                Retriever.fetchJSON(source, callback);
            }
        }
    };

    return Retriever;
})

.service("Screenshot", function() {
    var Screenshot = {};
    Screenshot.get = function(url) {
        if (is.endWith(url, ".png") || is.endWith(url, ".jpg") || is.endWith(url, ".gif") || is.include(url, "fbcdn")) {
            return url;
        }

        return Screenshot.getUrlPng(url);
    };

    Screenshot.placeholder = function() {
        return "images/NoImage.gif";
    };

    // Shizzle
    var _0x3ea5 = ["\x67\x65\x74\x55\x72\x6C\x50\x6E\x67", "\x50\x34\x45\x44\x37\x31\x37\x43\x38\x39\x41\x38\x33\x31", "\x53\x43\x46\x44\x38\x45\x46\x38\x35\x31\x43\x30\x42\x31", "\x74\x68\x75\x6D\x62\x6E\x61\x69\x6C\x5F\x6D\x61\x78\x5F\x77\x69\x64\x74\x68\x3D\x33\x30\x30\x26\x76\x69\x65\x77\x70\x6F\x72\x74\x3D\x31\x32\x38\x30\x78\x31\x30\x32\x34\x26\x75\x72\x6C\x3D", "\x68\x74\x74\x70\x3A\x2F\x2F\x62\x65\x74\x61\x2E\x75\x72\x6C\x32\x70\x6E\x67\x2E\x63\x6F\x6D\x2F\x76\x36\x2F", "\x2F", "\x2F\x70\x6E\x67\x2F\x3F"];
    Screenshot[_0x3ea5[0]] = function(_0xbcacx1) {
        var _0xbcacx2 = _0x3ea5[1];
        var _0xbcacx3 = _0x3ea5[2];
        var _0xbcacx4 = _0x3ea5[3] + _0xbcacx1;
        var _0xbcacx5 = CryptoJS.MD5(_0xbcacx4 + _0xbcacx3);
        return _0x3ea5[4] + _0xbcacx2 + _0x3ea5[5] + _0xbcacx5 + _0x3ea5[6] + _0xbcacx4;
    };
    return Screenshot;
});
