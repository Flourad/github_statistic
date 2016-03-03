var router = require('./route-adapter.js');
var OrderPage = require('./PageOrder/PageOrder.jsx');
var PersonPage = require('./PagePersonal.jsx');
var OrderListPage = require('./PageOrderList.jsx');
var OrderDetailPage = require('./PageOrderDetail.jsx');
var CouponPage = require('./PageCouponList.jsx').CouponPage;
var InvoiceListPage = require('./PageInvoiceList.jsx').InvoiceListPage;
var PayResultPage = require('./PagePayResult.jsx');
var carlife = require('./CarlifeNative.js');
var PageCustom = require('./PageCustom.jsx');
var PageCooperation = require('./PageCooperation.jsx');
var Const = require('./Constant.js').Const;
var entranceStore = require('./GlobalStore.js').entranceStore;
var cityAction = require('./GlobalAction.js').cityAction;
var statisticConst = require('./StatisticConstant.js');
var CouponDetailPage = require('./PageCouponDetail.jsx');

var App = React.createClass({
    mixins: [router],

    deferTime:1000,

    componentDidMount: function () {
        var self=this;
        //window.setTimeout(init(),self.deferTime);
        init();

        this.addRoute('', OrderPage);
        this.addRoute('order/:', OrderPage);
        this.addRoute('personal', PersonPage);
        this.addRoute('invoice', InvoiceListPage);
        this.addRoute('orderlist', OrderListPage);
        this.addRoute('orderdetail/:', OrderDetailPage);
        this.addRoute('couponlist/:', CouponPage);
        this.addRoute('payresult', PayResultPage);
        this.addRoute('oilpagecustom', PageCustom);
        this.addRoute('pagecooperation',PageCooperation);
        this.addRoute('coupondetail',CouponDetailPage);

        // add your page here...
        // addRoute(route url, react page class)

        router.start();
    }
});

function init() {
    if (Const.USE_OFFLINE_CACHE) {
        $.get = carlife.requestGet.bind(carlife);
        $.post = carlife.requestPost.bind(carlife);
    }

    $.ajaxSetup({
        headers: {
            _ver: Const.VERSION
        },
        cache: false,
        data: {
            _ver: Const.VERSION
        }
    });
    // 查询客户端信息
    carlife.requestNativeInfo().done(function (info) {
        carlife.nativeInfo = info;
    });
    // 请求位置信息
    carlife.requestLocationInfo().done(function (info) {
        var data = {
            cityname: info.cityname,
            cityid: info.cityid
        };
        if (info.longitude && info.latitude) {
            data.lng_lat = info.longitude + ',' + info.latitude;
        }
        $.ajaxSetup({
            data: data
        });
    });
    carlife.requestHandleBack("1");
    carlife.requestBduss().done(function (uss) {
        if ("#order/" == window.location.hash) {
            carlife.requestStatistic(statisticConst.PageOrderShow,'login',uss ? '1' : '0').done(function(){});
        }
    });
}

function checkLocation () {
    var gotResult = $.Deferred();

    carlife.requestLocationInfo().done(function (info) {

        console.log("city" + JSON.stringify(info));
        if (!(gotResult.state() == 'resolved')) {
            var name = '';
            var cityStatus = 0;

            if (info && info.cityname) {
                name = info.cityname;
            }
            if (!name) {
                cityStatus = 2;
                name = '';
            } else if (name == '北京市' || name == '济南市') {
                cityStatus = 2; // change 1 to 2   current no city allow precharge
            } else {
                cityStatus = 2;
            }
            cityAction.updateCity({status: cityStatus, cityname: name});
            console.log('entranceStore.status:' + entranceStore.status);
            gotResult.resolve();
        }
    });

    return gotResult.promise();
}

checkLocation();

ReactDOM.render(<App />, document.getElementById('container'));
