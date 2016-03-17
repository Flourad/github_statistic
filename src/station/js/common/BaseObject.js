/**
 * Created by jinjiaxing on 16/3/17.
 * 各页面的基类 @file
 * 实现一些通用的方法
 */
function BaseObject(options) {
    this.options = options||{};
}

BaseObject.prototype.init = function (params) {
    this.options.init&&this.options.init(params);
}

BaseObject.prototype.setNewUrl = function (url) {
    if (url&&url != "") {
        this.options["url"] = url;
    }
    return this;
}

BaseObject.prototype.setNewParams = function (params) {
    if (params&&params != "") {
        this.options["params"] = params;
    }
    return this;
}

BaseObject.prototype.setOptions = function (options) {
    $.extend(true, this.options, options);
}

BaseObject.prototype.isDemo = function () {
    var pathName = location.pathname;
    var pathNames = pathName.split('/');
    var spName = '';
    if (pathNames.length >= 2) {
        spName = pathNames[1];
    }

    if (spName == 'malldemo') {
        return true;
    } else {
        return false;
    }
}

window.BaseObject = BaseObject;


