/**
 * Created by jinjiaxing on 16/3/4.
 */
let { Button, Icon, Table } =AntD;

class PagePermission extends React.Component {
    constructor(props) {
        super(props);

        this.data = [{
            key: '1',
            name: '胡彦斌',
            phone: '13904015882',
            address: '北京西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            phone: '13905015882',
            address: '天津西湖区湖底公园2号'
        }, {
            key: '3',
            name: '李大嘴',
            phone: '13914015782',
            address: '沈阳西湖区湖底公园3号'
        }];

        this.state = {
            dataSource: this.data
        };

        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render(text) {
                    return <a href="#">{text}</a>;
                }
            }, {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
            }, {
                title: '管辖油站',
                dataIndex: 'address',
                key: 'address',
            }, {
                title: '操作',
                key: 'operation',
                render(text, record) {
                    return (
                        <div>
                            <button className="columnButton">编辑</button>
                            <button className="columnButton">删除</button>
                        </div>
                    );
                }
            }];
    }

    componentDidMount() {

    }

    componentWillMount() {
        //var me=this;
        //$.ajax({
        //    type: 'get',
        //    data:'',
        //    url: '/admin/account/info',
        //    dataType:'json',
        //    success: function(data){
        //        console.log('+++++++++++++++++');
        //        console.log(data);
        //        me.setState({dataSource:data.data.operator});
        //    }
        //
        //});
    }

    render() {
        return (
            <div id="pagePermission">
                <div className="pagePermission_Header">
                    <h1 className="headtext">权限管理</h1>
                    <Button className="headButton" type="primary" size="large">
                        <Icon type="plus"/>
                        新增人员
                    </Button>
                </div>
                <div className="pagePermission_Table">
                    <Table columns={this.columns} dataSource={this.state.dataSource}/>
                    <label className="dataTotal">共 3 条记录</label>
                </div>
            </div>
        );
    }
}

PagePermission.defaultProps = {};
export default PagePermission;