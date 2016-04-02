/*  (C) 2012 Premist aka Minku Lee.
 LICENSE : https://github.com/premist/node-crossdomain-proxy/blob/master/LICENSE
 */

var http = require('http');
var url = require('url');
var os = require('os');

var TEST = false;
var LOG_POST_BODY = false;

var PROXY_HOST = '127.0.0.1';
var PROXY_PORT = process.env.port || 8000;
var SERVER_HOST = '127.0.0.1';
var SERVER_PORT = 8080;
//var OIL_SERVER_HOST = !TEST ? 'oil.baidu.com' : 'nj03-map-carlife-caroil01.nj03.baidu.com';
//var OIL_SERVER_PORT = !TEST ? 80 : 8240;
var OIL_SERVER_HOST =  'data.cloudaice.com';
var OIL_SERVER_PORT =  80;

// calculate host ip dynamically
var ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        PROXY_HOST = iface.address;

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
        }
        ++alias;
    });
});


function modifySetCookie(headers) {
    if (!headers || !headers['set-cookie'] || headers['set-cookie'].length == 0) {
        return;
    }

    var newSetCookie = [];
    headers['set-cookie'].forEach(function (cookies) {
        var newCookies = [];
        cookies.split(';').forEach(function (cookie) {
            var parts = cookie.trim().split('=');
            var key = parts[0].trim();
            parts.shift();
            var value = parts.join('=');
            // change domain=.baidu.com -> domain=127.0.0.1
            if (key === 'domain') {
                value = PROXY_HOST;
            }
            newCookies.push(key + "=" + value);
        });
        newSetCookie.push(newCookies.join('; '));
    });
    headers['set-cookie'] = newSetCookie;
//    console.log("new set-cookie", headers);
}

function modifyCache(headers) {
    ['cache-control', 'expires', 'etag', 'last-modified', 'if-none-match', 'if-modified-since'].forEach(function(key){
        if (headers.hasOwnProperty(key)) {
            delete headers[key];
        }
    });
}

http.createServer(function (proxyReq, proxyResp) {
    var params = url.parse(proxyReq.url, true);
    var headers = proxyReq.headers;

    var reqOptions = {
        host: SERVER_HOST,
        port: SERVER_PORT,
        path: params.path,
        headers: headers,
        method: proxyReq.method
    };
    console.log('params.pathname=',params.pathname);
    console.log(params.pathname.substr(1, 'chinamapajax'.length));
    if ('chinamapajax' === params.pathname.substr(1, 'chinamapajax'.length) ||
        'worldmapajax' === params.pathname.substr(1, 'worldmapajax'.length) ||
        'githubworld' === params.pathname.substr(1, 'githubworld'.length) ||
        'githubchina' === params.pathname.substr(1, 'githubchina'.length)
    ) {
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        headers.host = OIL_SERVER_HOST;
//        if (params.query.hasOwnProperty('bduss')) {
//            headers['Cookie'] = 'BDUSS=' + params.query.bduss;
//        }
        reqOptions = {
            host: OIL_SERVER_HOST,
            port: OIL_SERVER_PORT,
            path: params.path,
            headers: headers,
            method: proxyReq.method
        };
    } else if ('/mock' === params.pathname.substr(0, '/mock'.length)) {
        //console.log(proxyReq.method, proxyReq.url);
        //proxyResp.writeHead(200);
        //proxyResp.write('(' + mock + ')' + '(' + JSON.stringify(params.query) + ');');
        //proxyResp.end();
        //return;
    }

    var req = http.request(reqOptions, function (res) {
        console.log(req.method, req.path, res.statusCode);
        if (LOG_POST_BODY && req.method === 'POST') {
            console.log(req.postbody);
        }
        var resHeaders = res.headers;

        if (reqOptions.host === 'cp01-rdqa-dev316.cp01.baidu.com') {
            modifySetCookie(resHeaders);
//            resHeaders['Access-Control-Allow-Origin'] = 'http://127.0.0.1:' + PROXY_PORT;
//            resHeaders['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
//            resHeaders['Access-Control-Allow-Credentials'] = 'true';
//            resHeaders['Access-Control-Allow-Methods'] = "GET, POST, PUT";
        } else {
            // disable cache, force refresh page
            modifyCache(resHeaders);
        }
        proxyResp.writeHead(200, resHeaders);

        var body = "";
        res.on('data', function (data) {
            body += data;
            proxyResp.write(data);
        });
        res.on('end', function () {
            proxyResp.end();
            if (reqOptions.host === 'data.cloudaice.com') {
//                console.log(body);
            }
        });
    });
    req.on('error', function (e) {
        console.log('An error occured: ' + e.message);
        proxyResp.writeHead(503);
        proxyResp.write("Error!");
        proxyResp.end();
    });

    if (/POST|PUT/i.test(proxyReq.method)) {
        if (!LOG_POST_BODY) {
            proxyReq.pipe(req);
        } else {
            var body = '';
            proxyReq.on('data', function (data) {
                body += data;
                req.write(data);
            });
            proxyReq.on('end', function () {
                req.postbody = body;
            });
        }
    } else {
        req.end();
    }

}).listen(PROXY_PORT);

console.log("running... open 'http://" + PROXY_HOST + ":" + PROXY_PORT + "' to test");
