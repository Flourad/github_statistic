var configAction = require('./GlobalAction.js').configAction;
var bdussAction = require('./GlobalAction.js').bdussAction;
var userInfoAction = require('./GlobalAction.js').userInfoAction;
var balanceAction = require('./GlobalAction.js').balanceAction;
var cityAction = require('./GlobalAction.js').cityAction;
var usedCouponCountAction = require('./GlobalAction.js').usedCouponCountAction;
var whiteUserAction = require('./GlobalAction.js').whiteUserAction;
var keyboardDoneAction = require('./GlobalAction.js').keyboardDoneAction;
var Const = require('./Constant.js').Const;
var loginAction = require('./GlobalAction.js').loginAction;

var configStore = Reflux.createStore({
    config: null,

    listenables: [configAction],

    onUpdateConfig: function (data) {
        this.config = data;
        this.trigger(this.config);

        console.log("update config" + JSON.stringify(data));
    }

});


function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    // important! domain is needed
    var cookieVal = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) +
        "; path=/; domain=" + location.hostname;
    document.cookie = cookieVal;
}

var bdussStore = Reflux.createStore({
    bduss: '',

    listenables: [bdussAction],

    onUpdateBduss: function (bduss) {
        this.bduss = bduss;
        setCookie('BDUSS', bduss === undefined ? '' : bduss);
        if (bduss) {

            // update user info when bduss change

            $.get(Const.server + Const.req_user_info, {}).done(function (result) {

                if (result.errno === 0) {
                    userInfoAction.updateUserInfo(result.data);
                }
            });
            $.get(Const.server + Const.reqCouponUsedCount, {}).done(function (result) {

                if (result.errno === 0) {
                    if (result.data) {
                        usedCouponCountAction.updateUsedCouponCount(result.data.count);
                        usedCouponCountAction.updateLockCouponOrderId(result.data.order_list);
                    }
                }
            });
        } else {
            userInfoAction.updateUserInfo({});
            usedCouponCountAction.updateUsedCouponCount(0);
            usedCouponCountAction.updateLockCouponOrderId(null);
        }
        this.trigger(this.bduss);
    }

});

var userInfoStore = Reflux.createStore({
    userInfo: {},

    listenables: [userInfoAction],

    onUpdateUserInfo: function (userInfo) {
        this.userInfo = userInfo;
        this.trigger(this.userInfo);
        console.log('userInfo: ' + JSON.stringify(userInfo));
    }
});

var balanceStore = Reflux.createStore({
    balance: 0,
    status: 0,

    listenables: [balanceAction],

    onUpdateBalance: function (data) {
        this.balance = data.balance;
        if (data.status) {
            this.status = data.status;
        }
        this.trigger(data);
    }
});

var entranceStore = Reflux.createStore({
    // 1:能充, 2:不能充, 3:不能充且需要跳转, -1:timeout
    status: 0,
    cityname: '',

    listenables: [cityAction],

    onUpdateCity: function (data) {
        this.status = data.status;
        this.cityname = data.cityname;
        if (whiteListStore.isWhite == 1) {
            this.status = 1;
        }
        this.trigger(data);
    }

});

var doneClickStore = Reflux.createStore({
    listenables: [keyboardDoneAction],
    onUpdateDoneClick: function () {
        this.trigger();
    }
});

var usedCouponCountStore = Reflux.createStore({
    usedCouponCount: 0,
    lockCouponOrderId: null,

    listenables: [usedCouponCountAction],

    onUpdateUsedCouponCount: function (usedCouponCount) {
        this.usedCouponCount = usedCouponCount;
        this.trigger(this.usedCouponCount);
    },
    onUpdateLockCouponOrderId: function (orderId) {
        this.lockCouponOrderId = orderId;
        this.trigger(this.lockCouponOrderId);
    }
});

var whiteListStore = Reflux.createStore({
    whitelist: [],
    listenables:[whiteUserAction],
    isWhite : 0,

    onUpdateWhiteList: function (list) {
        if (list && list.length > 0) {
            this.whitelist = list;
            if (0 == this.isWhite) {
                for (var i in this.whitelist) {
                    if ('wl_key_r_station' == this.whitelist[i]) {
                        this.isWhite = 1;
                        entranceStore.onUpdateCity({status: entranceStore.status, cityname:entranceStore.cityname});
                        console.log('user is in white list');
                        break;
                    }
                }
            }
        }
    }
});

var loginStore = Reflux.createStore({
    isOnline: false,
    isSocialAccount: false,

    listenables:[loginAction],

    onUpdateLoginState: function(loginInfo) {

        var nativeInfo = carlife.nativeInfo;

        //The protocol: 0(offline), 1(online);
        //but in the iOS platform: 0(offline or login with social account), 1(online).
        var loginStatus = parseInt(loginInfo.status);

        if (nativeInfo['os'] === 'android') {
            if (loginStatus == 1) {
                this.isOnline = true;
                carlife.requestCheckSocialLogin().done(function(result) {
                    //0（否），1（是）
                    this.isSocialAccount = (1 == parseInt(result.status));
                }.bind(this));
            } else {
                this.isOnline = false;
                this.isSocialAccount = false;
            }
        } else if (nativeInfo['os'] === 'iPhone OS') {
            if (loginStatus == 1) {
                this.isOnline = true;
                this.isSocialAccount = false;
            } else {
                carlife.requestCheckSocialLogin().done(function(result) {
                    //0（否），1（是）
                    this.isOnline = (1 == parseInt(result.status));
                    this.isSocialAccount = (1 == parseInt(result.status));
                }.bind(this));
            }
        }

        this.trigger(loginInfo);
    }
});

var showHomePage = false;

exports.configStore = configStore;
exports.bdussStore = bdussStore;
exports.userInfoStore = userInfoStore;
exports.balanceStore = balanceStore;
exports.entranceStore = entranceStore;
exports.doneClickStore = doneClickStore;
exports.usedCouponCountStore = usedCouponCountStore;
exports.showHomePage = showHomePage;
exports.loginStore = loginStore;
