/**
 * Created by jinjiaxing on 16/3/4.
 */

import Query from '../Query.js';
let { Button, Icon, Table } =AntD;

class PagePermission extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: undefined,
            total:0
        };

        var me=this;
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width:300
            }, {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
                width:300
            }, {
                title: '管辖油站',
                dataIndex: 'station_name',
                key: 'station_name',
            }, {
                title: '操作',
                key: 'd',
                width:200,
                render(text, record) {
                    return (
                        <div>
                            <button className="columnButton" onClick={me.editHandler.bind(me,text, record)}>编辑</button>
                            <button className="columnButton" onClick={me.delHandler.bind(me,text, record)}>删除</button>
                        </div>
                    );
                }
            }];
    }

    componentWillMount() {

        // 取得操作员列表信息
        Query.get(oilConst.reqOperatorList, '', function (data) {
            if(data && data.data && data.data.items){
                console.log('取得操作员列表信息:',data.data.items);
                this.setState({dataSource:data.data.items});
                this.setState({total:data.data.page.total});
            }else{
                console.log('取得操作员列表为空');
            }

        }.bind(this));
    }


    componentDidMount() {

    }

    /**
     * table数据绑定key
     *
     * @param record 行数据
     * @returns {*}
     */
    getRowKey(record) {
        return record.id;
    }

    /**
     * 编辑操作员数据
     *
     * @param text todo
     * @param record 每行数据对象
     */
    editHandler(text, record){
        console.debug('编辑:',record);
        // 带参数
        var data={status:'edit',data:record};
        var url={pathname:'/pageaddpermission',state:{data}};
        this.context.router.push(url);
    }

    /**
     * 删除操作员数据
     *
     * @param text todo
     * @param record 每行数据对象
     */
    delHandler(text, record){
        console.debug('删除:',record);

        var reqData={id:record.id,station_id:record.station_id};
        Query.post(oilConst.reqOperateDelete, reqData, function (data) {
            console.log('删除成功');
            this.forceUpdate();
        }.bind(this));
    }

    /**
     * 跳转到新增权限人员界面
     */
    toAdd(){
        // 带参数
        //var data={a:'123',b:'456'};
        //var url={pathname:'/pageaddpermission',state:{data}};
        //var url={pathname:'/pageaddpermission',state:{data}};
        var url={pathname:'/pageaddpermission'};
        this.context.router.push(url);
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
                    <Table rowKey={this.getRowKey.bind(this)} columns={this.columns} dataSource={this.state.dataSource}
                           pagination={{ pageSize: 10 }} useFixedHeader/>
                    <label className="dataTotal">共 <i style={{color:"red"}}>{this.state.total}</i> 条记录</label>
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