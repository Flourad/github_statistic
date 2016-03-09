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
        }, {
            key: '4',
            name: '胡彦祖',
            phone: '13905015882',
            address: '天津西湖区湖底公园2号'
        }, {
            key: '5',
            name: '胡彦祖',
            phone: '13905015882',
            address: '天津西湖区湖底公园2号'
        }, {
            key: '6',
            name: '胡彦祖',
            phone: '13905015882',
            address: '天津西湖区湖底公园2号'
        }, {
            key: '7',
            name: '胡彦祖',
            phone: '13905015882',
            address: '天津西湖区湖底公园2号'
        }, {
            key: '9',
            name: '胡彦祖',
            phone: '13905015882',
            address: '天津西湖区湖底公园2号'
        }, {
            key: '8',
            name: '胡彦祖',
            phone: '13905015882',
            address: '天津西湖区湖底公园2号'
        }];

        this.state = {
            dataSource: this.data
        };

        var me=this;
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
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
                            <button className="columnButton" onClick={me.editHandler.bind(me,text, record)}>编辑</button>
                            <button className="columnButton" onClick={me.editHandler.bind(me,text, record)}>删除</button>
                        </div>
                    );
                }
            }];
    }

    editHandler(text, record){
        console.log(record);
    }

    delHandler(text, record){
        console.log(record);
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

    /**
     * 跳转到新增权限人员界面
     */
    toAdd(){
        console.log(this.context.router);
        this.context.router.push('/pageaddpermission');
    }

    render() {
        return (
            <div id="pagePermission">
                <div className="pagePermission_Header">
                    <h1 className="headtext">权限管理</h1>
                    <Button onClick={this.toAdd.bind(this)} className="headButton" type="primary" size="large">
                        <Icon type="plus"/>
                        新增人员
                    </Button>
                </div>
                <div className="pagePermission_Table">
                    <Table columns={this.columns} dataSource={this.state.dataSource}
                           pagination={{ pageSize: 10 }} useFixedHeader/>
                    <label className="dataTotal">共 <i style={{color:"red"}}>3</i> 条记录</label>
                </div>
            </div>
        );
    }
}

PagePermission.defaultProps = {};
PagePermission.contextTypes = {
    router: function() { return React.PropTypes.func.isRequired; }
};

export default PagePermission;