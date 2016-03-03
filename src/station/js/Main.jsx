/**
 * Created by jinjiaxing on 16/3/3.
 */

import { DatePicker, message,Table } from 'antd';

const {Component} = React;

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date:'',
            dataSource:[{
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号'
            }, {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }],
            columns:[{
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: 'station_id',
                dataIndex: 'station_id',
                key: 'station_id',
            },{
                title: 'userid',
                dataIndex: 'userid',
                key: 'userid',
                }]
        }
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

    //static defaultProps = {}

    componentDidMount(){
        console.log('admin');
        // todo 这个buuss 以后要从cookie取得
        var bduss='GtsZn5sNWhPR2J5V0JDREJDZnRMSUZOS0hNRmtoS3l5YndKZ3A1YlRkMUZMdjlXQVFBQUFBJCQAAAAAAAAAAAEAAABoeEIGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEWh11ZFoddWU';
        this.setCookie('BDUSS', bduss === undefined ? '' : bduss);
    }

    handleClick(){
        var me=this;
        $.ajax({
            type: 'get',

            url: '/admin/Operator/list',

            data: '' ,
            dataType:'json',

            success: function(data){
               console.log(data);
                me.setState({dataSource:data.data.items});
            }


        });
    }

    render(){
        return(
            <div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                <button onClick={this.handleClick.bind(this)}>请求</button>
            </div>

        )

    }
}







ReactDOM.render(<App />, document.getElementById('container'));