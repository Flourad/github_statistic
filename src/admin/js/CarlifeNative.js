/**
 * interface for call native
 */
var bdussAction = require('./GlobalAction.js').bdussAction;
var bdussStore =  require('./GlobalAction.js').bdussStore;
var userInfoAction = require('./GlobalAction.js').userInfoAction;
var userInfoStore = require('./GlobalStore.js').userInfoStore;
var loginAction = require('./GlobalAction.js').loginAction;

var keyboardDoneAction = require('./GlobalAction.js').keyboardDoneAction;

var backAction = require('./PageBackAction.js');
var Const = require('./Constant.js').Const;

// important!! do *not* modify the following line for mock test
var NATIVE_COMM_TAG = 'iframe';

function newiframe(id) {
    var docId = 'NativeBridge' + id;
    deliframe(id);
    var iframe = document.createElement(NATIVE_COMM_TAG);
    iframe.id = docId;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    return iframe;
}

function deliframe(id) {
    var docId = 'NativeBridge' + id;
    var elem = document.getElementById(docId);
    if (elem) {
        elem.parentElement.removeChild(elem);
    }
}

/*
 usage:

 var carlife = require('../CarlifeNative.js');
 carlife.requestXXX().done(function(result){
 log(result);
 });

 */


var reqMap = {};
var id = 1;

function nextId() {
    return id++;
}

function addpara(url, key, value) {
    return url + '&' + encodeURIComponent(key) + '=' + encodeURIComponent(value);
}

function requestWithoutCallback(url) {
    var id = nextId();
    url = addpara(url, 'tag', id);
    newiframe(id).setAttribute('src', url);
}

function request(url) {
    var defer = $.Deferred();

    var id = nextId();
    reqMap[id] = defer;

    url = addpara(url, 'tag', id);
    newiframe(id).setAttribute('src', url);

    console.log("id=" + id + ", url = " + url);

    return defer.promise();
}

function response(id) {
    var defer = reqMap[id];
    if (defer) {
        delete reqMap[id];
        var args = [];
        Array.prototype.push.apply(args, arguments);
        args.shift();
        defer.resolve.apply(null, args);
    }
    deliframe(id);
}

function responseFail(id) {
    var defer = reqMap[id];
    if (defer) {
        delete reqMap[id];
        var args = [];
        Array.prototype.push.apply(args, arguments);
        args.shift();
        defer.reject.apply(null, args);
    }
    deliframe(id);
}

function dealWithExtraUriEncode(encodedData) {
    if (carlife.nativeInfo['os'] === 'android'
        && versionCompare(carlife.nativeInfo['plugin-version'], '2.0.1') <= 0) {
        // for android baidumap-8.8 only: encode twice!
        console.log('!!!encode twice for android');
        encodedData = encodeURIComponent(encodedData);
    }
    return encodedData;
}

// return 0 if lhs = rhs, less than 0 if lhs < rhs, and greater than 0 if lhs > rhs.
function versionCompare(lhs, rhs) {
    var result;
    var separator = '.';
    var slhs = lhs.toString().toLowerCase();
    var srhs = rhs.toString().toLowerCase();
    var lhsArray = splitString(slhs, separator);
    var rhsArray = splitString(srhs, separator);
    var end = lhsArray.length < rhsArray.length ? lhsArray.length : rhsArray.length;

    for (var i = 0; i < end; i++) {
        if (lhsArray[i] === rhsArray[i]) {
            continue;
        }
        result = parseInt(lhsArray[i]) - parseInt(rhsArray[i]);
        if (isNaN(result)) {
            continue;
        }
        if (result != 0) {
            return result;
        }
    }

    return slhs < srhs ? -1 : (slhs === srhs ? 0 : 1);
}

function splitString(stringToSplit, separator) {
    return stringToSplit.split(separator);
}

// 判断设备api
// $.os.android
// $.os.ios
// $.os.version
var carlife = {

    //Toast
    requestToast: function (text) {
        var url = 'carlife://common/command?do=requestToast';
        url = addpara(url, 'toast', text);
        return request(url);
    },

    onRequestToast: function (tag) {
        response(tag);
    },

    //check network
    requestNetworkStatus: function () {
        var url = 'carlife://common/command?do=requestNetworkStatus';
        return request(url);
    },

    /**
     * onNetworkStatus callback
     * @param json key:status ; value:0（无网络），1（2G/3G/4G），2（wifi
     * @param tag
     */
    onNetworkStatus: function (json, tag) {
        response(tag, json);
    },

    /*
     * request to back page
     */
    requestFinish: function () {
        var url = 'carlife://common/command?do=requestFinish';
        return requestWithoutCallback(url);
    },

    //request to login page
    requestLogin: function () {
        var url = 'carlife://common/command?do=requestGotoLoginPage';
        // 用户为第三方登录时，提示对话框文案
        url = addpara(url, 'msg', '您使用了第三方账号登录，需要您使用百度账号进行登录，请切换到百度账号后使用，谢谢。');
        return request(url);
    },

    /**
     * onLoginResult callback
     * @param json key:status value:0（登录失败），1（登录成功） ; key:bduss value:bduss
     * @param tag
     */
    onLoginResult: function (json, tag) {
        console.log(JSON.stringify(json));

        bdussAction.updateBduss(json.bduss);
        loginAction.updateLoginState(json);

        response(tag, json);
    },

    //request login status
    requestBduss: function () {
        var url = 'carlife://common/command?do=requestIsLogin';
        return request(url);
    },

    /**
     * onCheckLoginStatus callback
     * @param json key:status value:0（未登录），1（已登录） key:bduss value:budss
     * @param tag tag
     */
    onCheckLoginStatus: function (json, tag) {
        var bduss = '';
        if (json.status == '1') {
            bduss = json.bduss;
        }
        bdussAction.updateBduss(bduss);
        loginAction.updateLoginState(json);
        response(tag, bduss);
    },

    //request social login status
    requestCheckSocialLogin: function () {
        var url = 'carlife://common/command?do=requestIsSocialLogin';
        return request(url);
    },

    /**
     * onCheckLoginStatus callback
     * @param json key:status value:0（否），1（是）
     * @param tag tag
     */
    onCheckSocialLoginStatus: function (json, tag) {
        response(tag, json);
    },

    //Loading Dialog
    requestLoadingDialog: function (show) {
        var url = 'carlife://common/command?do=requestShowLoadingDialog';
        url = addpara(url, 'show', show ? "1" : "0");
        return request(url);
    },

    onRequestShowLoadingDialog: function (tag) {
        response(tag);
    },

    //request na info
    requestNativeInfo: function () {
        var url = 'carlife://common/command?do=requestNativeInfo';
        return request(url);
    },

    /**
     * onRequestNativeInfo callback
     * @param json key:cuid value:cuid
     *  key:package value:package
     *  key:os value:os
     *  key:model value:model
     *  key:os-version value:os-version
     *  key:map-version value:map-version
     *  key:plugin-version value:plugin-version
     * @param tag tag
     */
    onRequestNativeInfo: function (json, tag) {
        response(tag, json);
    },

    //request pay
    requestGotoPay: function (payData) {
        var url = 'carlife://common/command?do=requestGotoPay';
        var sPayData = JSON.stringify(payData);
//        var b64PayData = new Buffer(sPayData).toString('base64');
        var encodedData = dealWithExtraUriEncode(sPayData);
        url = addpara(url, 'paydata', encodedData);
        return request(url);
    },

    /**
     * onPay callback
     * @param json {key:errno,value:支付状态 ; key:orderid，value:回传的orderid}
     * @param tag tag
     */
    onPay: function (json, tag) {
        response(tag, json);
    },

    //request location
    requestLocationInfo: function () {
        var url = 'carlife://common/command?do=requestLocationInfo';
        return request(url);
    },

    /**
     * onRequestLocationInfo callback
     * @param json {key:longitude ,vaule:浮点string ；key:latitude
     *   ,vaule:浮点string ； key: city , value: citycode}
     * @param tag tag
     */
    onRequestLocationInfo: function (json, tag) {
        response(tag, json);
    },

    //statistic
    requestStatistic: function (key, parakey, paravalue) {
        if (!key) {
            return;
        }
        var url = 'carlife://common/command?do=requestStatistic';
        url = addpara(url, 'key', key);
        if (parakey) {
            url = addpara(url, 'parakey', parakey);
        }
        if (paravalue) {
            url = addpara(url, 'paravalue', paravalue);
        }
        return request(url);
    },

    onRequestStatistic: function (tag) {
        response(tag);
    },

    // start time
    requestReportStartTime: function (key) {
        if (!key) {
            return;
        }
        var url = 'carlife://common/command?do=requestReportStartTime';
        url = addpara(url, 'key', key);
        return request(url);
    },

    onRequestReportStartTime: function (tag) {
        response(tag);
    },

    /*
     * request native page
     */
    requestNativePage: function (page, args) {
        var url = 'carlife://common/command?do=requestNativePage';
        url = addpara(url, 'name', page);
        if (args) {
            for (var key in args) {
                url = addpara(url, key, args[key]);
            }
        }
        return request(url);
    },

    requestGasStatisonPage: function () {
        return this.requestNativePage('StationList', {
            extra: JSON.stringify({
                _ver: Const.VERSION
            })
        });
    },

    onStationList: function (json, tag) {
        response(tag, json);
    },

    requestSharePage: function (json) {
        return this.requestNativePage('Share', json);
    },

    requestHandleBack: function (handle) {
        var url = 'carlife://common/command?do=requestHandleBack';
        url = addpara(url, 'handle', handle);
        return request(url);
    },

    onRequestHandleBack: function (json, tag) {
        response(tag);
    },

    onBackPress: function () {
//        var hash = window.location.hash;
//        if (hash.indexOf('#order/') === 0) {
//            backAction.backPressed();
//        } else {
//            hash = back();
//            if (typeof(hash) === 'undefined') {
//                this.requestFinish();
//            }
//        }
        backAction.backPressed();
    },

    onKeyboardDoneClick: function () {
        keyboardDoneAction.updateDoneClick();
    },
    //dialog
    requestDialog: function (title, msg) {
        return this.requestCustomDialog(title, msg, '', '');
    },

    requestCustomDialog: function (title, message, positive, negative) {
        var url = 'carlife://common/command?do=requestDialog';
        var params = {
            title: title,
            message: message,
            okbutton: positive,
            cancelbutton: negative,
            canclebutton: negative
        };
        for (var key in params) {
            if (params[key]) {
                url = addpara(url, key, params[key]);
            }
        }
        return request(url);
    },

    onRequestDialog: function(json, tag){
        response(tag, json);
    },

    requestBindUser: function () {
        var url = 'carlife://common/command?do=requestBindUser';
        return request(url);
    },

    onRequestBindUser: function (json, tag) {
        if (json.status === '0') {
            // update user info
            $.get(Const.server + Const.req_user_info, {}).done(function (result) {
                if (result.errno == 0) {
                    userInfoAction.updateUserInfo(result.data);
                    bdussAction.updateBduss(bdussStore.bduss);
                }
            }).always(function () {
                response(tag, json);
            });
        } else {
            response(tag, json);
        }
    },

    requestGotoLoginPageWithoutDialog: function() {
        var url;

        if (versionCompare(this.nativeInfo['plugin-version'], '2.2.0') < 0) {
            url = 'carlife://common/command?do=requestGotoLoginPage';
            url = addpara(url, 'msg', '您使用了第三方账号登录，需要您使用百度账号进行登录，请切换到百度账号后使用，谢谢。');
        } else {
            url = 'carlife://common/command?do=requestGotoLoginPageWithoutDialog';
        }

        return request(url);
    },

    requestGet: function (url, data) {
        return this.requestAjax({
            url: url,
            method: 'GET',
            data: data
        });
    },

    requestPost: function (url, data) {
        return this.requestAjax({
            url: url,
            method: 'POST',
            data: data
        });
    },

    requestAjax: function (params) {
        console.log('requestAjax:' + params.url);
        params.header = params.header || {};
        params.data = params.data || {};

        $.extend(params.header, {
            _ver: '' + Const.VERSION
        });

        var data = $.extend({}, $.ajaxSettings.data);
        $.extend(data, params.data);
        params.data = data;

        params = JSON.stringify(params);
        console.log(params);
        var url = 'carlife://common/command?do=requestAjax';
        url = addpara(url, 'req', params);
        return request(url);
    },

    onAjaxResult: function (resp, tag) {
        console.log('onAjaxResult:', resp);
        var code = resp.code;
        if (code === -1) {
            responseFail(tag);
        } else {
            var result = resp.result;
            result = decodeURIComponent(result);
            console.log(result);
            var json = JSON.parse(result);
            response(tag, json);
        }
    },

    requestNative: function (url) {
        request(url);
    },

    requestNativeWithoutCallback: function (url) {
        requestWithoutCallback(url);
    },

    versionNameCompare: function (lhs, rhs) {
        return versionCompare(lhs, rhs);
    }

};

window.carlife = carlife;
module.exports = carlife;
