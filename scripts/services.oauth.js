var App = angular.module('App')

    //  ProductHunt OAuth
    .service("PHConfig", function() {
        var PHConfig = {
            url: "https://api.producthunt.com/v1",
            clientId: "7e5dab6037a254329d6be6b2ea6372d3b6328866f81f78e406f1a620075c54fe",
            clientSecret: "7dedcd8b9f137f5a62fe247f049dc3b4f14d832a1895b2dd2433bb30c2974210"
        };
        return PHConfig
    })

    // OAuth
    .service("OAuth", function(PHConfig, $http) {
        var OAuth = {},
            alreadyTried = !1,
            clientAuthUrl = PHConfig.url + "/oauth/token",
            clientParams = {
                client_id: PHConfig.clientId,
                client_secret: PHConfig.clientSecret,
                grant_type: "client_credentials"
            };
        OAuth.loadClientToken = function(callback) {
            return accessToken() ? callback(null) : void OAuth.getClientToken(function(err, token) {
                return err ? callback(err) : (accessToken(token), void callback(null))
            })
        }, OAuth.getClientToken = function(callback) {
            $http({
                method: "POST",
                url: clientAuthUrl,
                data: clientParams
            }).success(function(data) {
                callback(null, data.access_token)
            }).error(function(data) {
                callback(data)
            })
        }, OAuth.request = function(method, endpoint, params, callback) {
            OAuth.loadClientToken(function(err) {
                if (err) return callback(err);
                "GET" == method && (endpoint = OAuth.addQueryParams(endpoint, params), params = void 0);
                var options = {
                    method: method,
                    url: OAuth.url(endpoint),
                    headers: OAuth.tokenHeader(),
                    data: params
                };
                console.log("Fetching from " + options.url), $http(options).success(function(data) {
                    callback(null, data)
                }).error(function(data, status) {
                    401 != status || alreadyTried ? callback(data) : (alreadyTried = !0, OAuth.clearToken(), OAuth.request(method, endpoint, params, callback))
                })
            })
        }, OAuth.addQueryParams = function(endpoint, params) {
            var postFix = "?";
            for (var key in params) postFix += key + "=" + params[key] + "&";
            return endpoint + postFix
        }, OAuth.url = function(endpoint) {
            return PHConfig.url + endpoint
        }, OAuth.tokenHeader = function() {
            return accessToken() ? {
                Authorization: "Bearer " + accessToken()
            } : {}
        }, OAuth.clearToken = function() {
            delete localStorage.accessToken
        };
        var accessToken = function(token) {
            if (!token) {
                if (!localStorage.accessToken) return;
                return console.log("Loading access token from localstorage", localStorage.accessToken), JSON.parse(localStorage.accessToken)
            }
            localStorage.accessToken = JSON.stringify(token), console.log("Stored access token to localstorage", localStorage.accessToken)
        };
        return OAuth
    });
