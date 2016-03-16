/**
 * @file
 * Created by jinjiaxing on 16/3/9.
 * OilConst 静态资源
 */
var oilConst = {};

// 获取站长信息
oilConst.reqAccountInfo = '/admin/account/info';
// 权限管理-操作员列表
oilConst.reqOperatorList = '/admin/Operator/list';
// 权限管理-添加操作员
oilConst.reqOperatorSave = '/admin/operator/save';
// 权限管理-删除操作员
oilConst.reqOperateDelete = '/admin/operator/delete';

oilConst.reqAttendance = '/admin/Shift/query';

oilConst.reqTransactionList = '/admin/Transaction/query';

oilConst.reqTransactionInfo = '/admin/Order/info';

oilConst.reqExtendList = '/admin/marketing/list';

window.oilConst = oilConst;
