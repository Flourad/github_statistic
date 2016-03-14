/**
 * @file 全局store
 *
 * Created by jinjiaxing on 16/3/10.
 */

import LoginAction from '../actions/GlobalAction.js';
import Query from '../Query.js';

var LoginStore = Reflux.createStore({

    loginData: {
        data: {
            stations: undefined,
            user_name: '',
        },
        errno: '',
        errstr: ''
    },

    listenables: LoginAction,

    onUpdateLoginState: function () {

        // API-获取站长信息
        Query.get(oilConst.reqAccountInfo, '', function (userInfo) {
            console.debug('user info:', userInfo);
            this.loginData = userInfo;
            this.trigger(userInfo);
        }.bind(this));
    }
});

export default LoginStore;



