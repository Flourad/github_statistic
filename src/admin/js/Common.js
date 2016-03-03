var carlife = require('./CarlifeNative.js');

/**
 * @file Common.js 通用类
 * This class is a common class, use {@code iframe}.
 *
 * Created by jinjiaxing on 2015/11/17.
 */
(function (window, document) {

    var common = {};
    window.common = common;

    common.isFirstLoad = true;

    // 走马灯速度
    common.marqueeSpeed = 27.9;

    // 获取文字长度
    common.getTextWidth = function (text, fontSize) {
        var size = fontSize || '0.6rem';
        var span = document.getElementById('__getwidth');
        if (span == null) {
            span = document.createElement('span');
            span.id = '__getwidth';
            document.body.appendChild(span);
            span.style.visibility = 'hidden';
            span.style.whiteSpace = 'nowrap';
        }
        span.innerText = text;
        span.style.fontSize = size;

        return span.offsetWidth;
    },

        // iscrool 自定义参数列表
        common.iscrollOtions = {
            click: iScrollClick(),
            // 是否显示滚动条
            scrollbars: true,
            // 滚动条淡入淡出效果
            fadeScrollbars: true
        };

    // iscrool 自定义参数列表
    common.iscrollWrapperStyle = {
        height: '100%',
        overflow: 'hidden'
    };

    // 安卓4.4以下版本 iscroll click会执行2次
    function iScrollClick() {
        var myUserAgent = navigator.userAgent;
        // 安卓机器
        if (myUserAgent !== null || myUserAgent !== 'undefined') {
            if (myUserAgent.indexOf('Android') !== -1) {
                var s = myUserAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
                var osversion = parseFloat(s[0] + s[2]);
                if (osversion < 44) {
                    return false;
                } else {
                    return true;
                }

            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    // 针对于iphone机型input获取焦点时被遮挡的问题
    // scrollHeight=webview应该弹出高度
    common.resizeForInput = function (scrollHeight) {
        console.log('----------------common.resizeForInput-------------------');
        var deferTime = 500;
        setTimeout(function () {
            if (carlife.nativeInfo['os'] === 'android') {
                console.log('android');
            } else {
                console.log('ios');
                console.log(document.body.scrollTop);
                if (document.body.scrollTop < 200) {
                    document.body.scrollTop = scrollHeight;
                }
            }
        }, deferTime);
    }

    common.write = function (key, value) {
        //writeCookie(key, value, 365);
        localStorage.setItem(key, value);
    };

    common.read = function (key) {
        //return readCookie(key);
        return localStorage.getItem(key);
    };

    function readCookie(key) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(key + '=');
            if (start !== -1) {
                start = start + key.length + 1;
                var end = document.cookie.indexOf(';', start);
                if (end === -1) {
                    end = document.cookie.length;
                }
                return unescape(document.cookie.substring(start, end));
            }
        }
        return '';
    }

    function writeCookie(key, value, expiresDays) {
        var date = new Date();
        var days = isNaN(expiresDays) ? 365 : expiresDays;
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = date.toGMTString();
        var cookiestr = key + '=' + value + '; expires=' + expires + '; path=/';

        document.cookie = cookiestr;
    }

})(window, document);
