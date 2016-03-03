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
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            }]
        }
    }



    //static defaultProps = {}

    componentDidMount(){
        console.log('admin');
    }

    render(){
        return(
            <div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                <button>请求</button>
            </div>

        )

    }
}







ReactDOM.render(<App />, document.getElementById('container'));