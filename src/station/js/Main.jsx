/**
 * Created by jinjiaxing on 16/3/3.
 * @file
 */

import SilderBar from './component/SilderBar.jsx';
import Header from './component/Header.jsx';
import Query from './Query.js';
import CommonData from './common/CommonData.js';

class App extends React.Component {

    componentWillMount() {
        // 获取站长信息
        Query.get(oilConst.reqAccountInfo, '', function (data) {
            console.log(CommonData.loginData);
            console.log(data);
        });
    }

    render() {
        return (
            <div style={{height:'100%'}}>
                <Header />
                <SilderBar id="silderbar"/>
                <div id="oilContent">
                    {this.props.children}
                </div>
            </div>

        );
    }

    setCookie(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        // important! domain is needed
        var cookieVal = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) +
            "; path=/; domain=" + location.hostname;
        document.cookie = cookieVal;
    }

    componentDidMount() {
        console.log('admin');
        // todo 这个buuss 以后要从cookie取得
        var bduss = 'VZqVVFiMEdMWWVSVWlTTDhORGNsand3aFVacDB0UlllNDZSNVhZd0duQ2xGd1pYQVFBQUFBJCQAAAAAAAAAAAEAAABoeEIGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKWK3lalit5WL';
        this.setCookie('BDUSS', bduss === undefined ? '' : bduss);
    }

    handleClick() {
        var me = this;
        $.ajax({
            type: 'get',
            data: '',
            url: '/admin/Operator/listget',
            dataType: 'json',
            success: function (data) {
                console.log('+++++++++++++++++');
                console.log(data);
                me.setState({dataSource: data.data.items});
            }
        });
    }
}

export default App;
