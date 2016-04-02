/**
 * Created by jinjiaxing on 16/3/3.
 */
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function (e) {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth > 414) {
                docEl.style.fontSize = 20 * (414 / 320) + 'px';
            } else {
                var u = navigator.userAgent, app = navigator.appVersion;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isAndroid) {
                    docEl.style.fontSize = 18.5 * (clientWidth / 320) + 'px';
                } else if (isiOS) {
                    docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
                }
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);