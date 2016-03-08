/**
 * Created by jinjiaxing on 16/3/3.
 */

import SilderBar from './component/SilderBar.jsx';
import Header from './component/Header.jsx';

var App = React.createClass({

    render: function () {
        return(
            <div style={{height:'100%'}}>
                <Header />
                <SilderBar id = "silderbar" />
                <div id = "oilContent">
                    {this.props.children}
                </div>
            </div>

        );
    },

    setCookie:function(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        // important! domain is needed
        var cookieVal = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) +
            "; path=/; domain=" + location.hostname;
        document.cookie = cookieVal;
    },

    componentDidMount:function(){
        console.log('admin');
        // todo 这个buuss 以后要从cookie取得
        var bduss='GtsZn5sNWhPR2J5V0JDREJDZnRMSUZOS0hNRmtoS3l5YndKZ3A1YlRkMUZMdjlXQVFBQUFBJCQAAAAAAAAAAAEAAABoeEIGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEWh11ZFoddWU';
        this.setCookie('BDUSS', bduss === undefined ? '' : bduss);
    },


    handleClick:function(){
        var me=this;
        $.ajax({
            type: 'get',
            data:'',
            url: '/admin/Operator/listget',
            dataType:'json',
            success: function(data){
                console.log('+++++++++++++++++');
               console.log(data);
                me.setState({dataSource:data.data.items});
            }


        });
    }
});


export default App;
