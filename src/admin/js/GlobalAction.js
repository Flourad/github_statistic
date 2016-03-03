var bdussAction = Reflux.createActions([
    'updateBduss'
]);
var configAction = Reflux.createActions([
    'updateConfig'
]);
var userInfoAction = Reflux.createActions([
    'updateUserInfo'
]);
var balanceAction = Reflux.createActions([
    'updateBalance'
]);
var cityAction = Reflux.createActions([
    'updateCity'
]);
var keyboardDoneAction = Reflux.createActions([
    'updateDoneClick'
]);
var usedCouponCountAction = Reflux.createActions([
    'updateUsedCouponCount',
    'updateLockCouponOrderId'
]);
var whiteUserAction = Reflux.createActions([
    'updateWhiteList'
]);
var loginAction = Reflux.createActions([
    'updateLoginState'
]);

exports.bdussAction = bdussAction;
exports.configAction = configAction;
exports.userInfoAction = userInfoAction;
exports.balanceAction = balanceAction;
exports.cityAction = cityAction;
exports.keyboardDoneAction = keyboardDoneAction;
exports.usedCouponCountAction = usedCouponCountAction;
exports.whiteUserAction = whiteUserAction;
exports.loginAction = loginAction;

