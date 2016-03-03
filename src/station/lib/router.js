var router = (function () {

    "use strict";

    var routes = [];
    var defHandler;
    var fakehistory = [];
    var fakehash = window.location.hash || '#';

    function go(hash, args) {
        var ret = route(hash, 'go', args);
        if (ret) {
            fakehistory.push(fakehash);
            fakehash = hash;
            window.history.replaceState({}, '', hash);
        }
        return ret;
    }

    function back(args) {
        if (fakehistory.length == 0) {
            return !defHandler ? undefined : defHandler.call(undefined, 'back', args);
        }
        var ret = route(fakehistory[fakehistory.length - 1], 'back', args);
        if (ret) {
            fakehash = fakehistory.pop();
            window.history.replaceState({}, '', fakehash);
        }
        return ret;
    }

    function reload(args) {
        return route(fakehash, 'reload', args);
    }

    function addRoute(route, handler) {
        routes.push({parts: route.split('/'), handler: handler});
    }

    function addDefault(handler) {
        defHandler = handler;
    }

    function start() {
        route(fakehash);
    }

    function route(hash, action, args) {
        var path = hash.substr(1);
        var parts = path.split('/');
        var partsLength = parts.length;

        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            if (route.parts.length === partsLength) {
                var params = [];
                for (var j = 0; j < partsLength; j++) {
                    if (route.parts[j].substr(0, 1) === ':') {
                        params.push(parts[j]);
                    } else if (route.parts[j] !== parts[j]) {
                        break;
                    }
                }
                if (j === partsLength) {
                    if (args == null || typeof(args) !== 'object') {
                        args = {};
                    }
                    params.forEach(function (param) {
                        $.extend(args, unparam(param));
                    });
                    return route.handler.call(undefined, action, args);
                }
            }
        }

        return !defHandler ? undefined : defHandler.call(undefined, action, args);
    }

    function unparam(param) {
        var result = {};
        param.split('&').forEach(function (pair) {
            pair = pair.split('=');
            if (pair[0]) {
                result[pair[0]] = decodeURIComponent(pair[1] || '');
            }
        })
        return result;
    }

    function clearHistory() {
        fakehistory.splice(0, fakehistory.length);
    }

//    window.onhashchange = route;
//    window.onpopstate = function (event) {
//        console.warn("location: " + document.location + ", state: " + JSON.stringify(event.state));
//    };

    window.go = go;
    window.back = back;
    window.reload = reload;

    return {
        addRoute: addRoute,
        addDefault: addDefault,
        go: go,
        back: back,
        reload: reload,
        start: start,
        clearHistory: clearHistory
    };

}());

module.exports = router;
