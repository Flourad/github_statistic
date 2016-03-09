/**
 * Created by jinjiaxing on 16/3/9.
 * Query 和服务端交互类
 * @file
 */

class Query {
    constructor() {
        this.statusNoLogin = 1001;
        this.statusNoPermission = 1005;
    }
}

/**
 * get方式请求
 *
 * @param {string} url 请求地址
 * @param {Object} data 请求参数
 * @param {Function} callBack 回调函数
 */
Query.get = function (url, data, callBack) {
    Query.req('get', url, data, callBack);
};

/**
 * post方式请求
 *
 * @param {string} url 请求地址
 * @param {Object} data 请求参数
 * @param {Function} callBack 回调函数
 */
Query.post = function (url, data, callBack) {
    Query.req('post', url, data, callBack);
};

/**
 * 查询
 *
 * @param {string} type get post
 * @param {string} url 请求地址
 * @param {Object} data 请求参数
 * @param {Function} callBack 回调函数
 */
Query.req = function (type, url, data, callBack) {
    console.debug('get: url=' + url + ' data=' + data);
    var self = this;
    $.ajax({
        type: type,
        data: data,
        url: url,
        dataType: 'json',
        success: function (data) {
            if (data && data.errno === 0 && data.errstr === 'ok') {
                callBack(data);
            } else if (data.errno === self.statusNoLogin) {
                console.info('用户尚未登录');
                window.location.href = 'https://passport.rdtest.baidu.com/v2/?login&tpl=map_car&u=' + window.location.host;
            } else if (data.errno === self.statusNoPermission) {
                alert('没有访问权限,请重新登录');
                window.location.href ='https://passport.rdtest.baidu.com/v2/?login&tpl=map_car&u=' + window.location.host;
            }
        },
        error: function (e) {
            console.error('通信失败:', e);
            alert('通信失败:' + e);
        }
    });
}

export default Query;