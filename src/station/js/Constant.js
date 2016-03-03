var DEBUG = false;

var Const = {};
Const.VERSION = 2;

Const.USE_OFFLINE_CACHE = false;

//http://cp01-ocean-435.epc.baidu.com:8240/car/operation/get?pos_id=0

Const.server = 'http://oil.baidu.com';
//Const.server = window.location.protocol + '//' + window.location.host;

Const.req_station_info = "/car/station/info";
Const.req_config = "/car/config/list";
Const.req_operate_get = "/car/operation/get";
Const.req_user_info = "/car/account/info";
Const.req_station_list = '/car/station/list';
Const.req_coupon_list = '/car/coupon/list';
Const.req_order_add = '/car/order/oiladd';
Const.reqestCouponList = '/car/coupon/list';
Const.reqestCouponAvailable = '/car/coupon/available';
Const.reqPackage = '/car/package/list';
Const.req_home_balance = '/car/balance/main';
Const.req_person_count = '/car/account/count';
Const.req_order_info = '/car/order/info';
Const.req_remain_amount = '/car/balance/get';
Const.req_invoiceList_fetch = '/car/invoice/get';
Const.req_invoiceItem_add = '/car/invoice/add';
Const.req_invoiceItem_delete = '/car/invoice/delete';
Const.req_invoiceList_delete = '/car/invoice/deleteList'
Const.reqDetail = '/car/order/info';
Const.req_orderList_fetch = '/car/order/listv2';
Const.reqCancel = '/car/order/cancel';
Const.reqPayinfo = '/car/order/payinfov2';
Const.reqRecharge = '/car/order/recharge';
Const.reqPay = '/car/order/pay';
Const.reqCooperation = '/car/cooperation/save';

Const.req_cardOrder_listv2 = '/car/order/listv2';
Const.req_cardBalance_get = '/car/balance/get';
Const.req_cardPayInfo = '/car/order/payinfov2';
Const.reqCouponUsedCount = '/car/coupon/usedCount';
Const.reqWhiteList = '/car/config/whitelist';
Const.delOrder = '/car/order/deletemany';
Const.topList = '/car/coupon/toplist';

Const.applyCoupon = '/car/coupon/apply';

Const.internalVersion = '2016-03-02';

exports.DEBUG = DEBUG;

exports.Const = Const;
