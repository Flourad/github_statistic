module.exports = function (query) {
    console.log(JSON.stringify(query));

    var cmd = query.do;
    var tag = query.tag;

    var carlifeTest = {

        bduss:'VkMVZXTmhrQ1RFeGg2U2NRVWpkSFZBcDBOMkIzUmFDZWhMaDRxLUo3MkZZbnBXQVFBQUFBJCQAAAAAAAAAAAEAAADx1AkWc29uZ2t1bjUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIXVUlaF1VJWTT',
        requestToast: function () {
            carlife.onRequestToast(tag);
        },

        requestNetworkStatus: function () {
            carlife.onNetworkStatus({
                status: 2
            }, tag);
        },

        requestFinish: function () {

        },

        requestGotoLoginPage: function () {
            carlife.onLoginResult({
                status: 1,
                bduss: this.bduss
            }, tag);
        },

        requestIsLogin: function () {
            carlife.onCheckLoginStatus({
                status: 1,
                bduss: this.bduss
            }, tag);
        },

        requestIsSocialLogin: function () {
            carlife.onCheckSocialLoginStatus({
                status: 0
            }, tag);
        },

        requestShowLoadingDialog: function () {
            carlife.onRequestShowLoadingDialog(tag);
        },

        requestNativeInfo: function () {
            carlife.onRequestNativeInfo({os: 'mock'}, tag);
        },

        requestLocationInfo: function () {
            carlife.onRequestLocationInfo({
                longitude: '12948124.499575',
                latitude: '4845068.0222942',
                cityname: '北京市'
            }, tag);
        },

        requestGotoPay: function () {
            carlife.onPay({
                errno: 0,
                orderid: query.orderId
            }, tag);
        },

        requestStatistic: function () {
            carlife.onRequestStatistic(tag);
        },

        requestNativePage: function () {
            var page = query.name;
            if (page == 'StationList') {
                carlife.onStationList({
                    errno: 0,
                    orderid: query.orderId
                }, tag);
            } else if (page == 'Share') {

            }
        },

        requestHandleBack: function () {
            carlife.onRequestHandleBack(tag);
        },

        requestDialog: function () {
            carlife.onRequestDialog({
                status: 1
            }, tag);
        },

        requestBindUser: function () {
            carlife.onRequestBindUser({
                status: 0
            }, tag);
        },

        requestReportStartTime: function () {
            carlife.onRequestReportStartTime(tag);
        }
    };

    (carlifeTest[cmd])();
};