/**
 * Created by jinjiaxing on 16/3/4.
 */
let { Button, Icon, Table } =AntD;

class PagePermission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:this.data
        };

        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                render(text) {
                    return <div style={{display:'none'}}></div>;
                }
            },

            {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render(text) {
                return <a href="#">{text}</a>;
            }
        }, {
            title: '手机号',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '管辖油站',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '操作',
            key: 'operation',
            render(text, record) {
                return (
                    <span>
                    <a href="#">编辑{record.name}</a>
                    <span className="ant-divider"></span>
                    <a href="#">删除</a>
                    <span className="ant-divider"></span>
                  </span>
                );
            }
        }];

        this.data = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }, {
            key: '3',
            name: '李大嘴',
            age: 32,
            address: '西湖区湖底公园1号'
        }];

    }

    componentDidMount(){

    }

    componentWillMount(){
        var me=this;
        $.ajax({
            type: 'get',
            data:'',
            url: '/admin/operator/list',
            dataType:'json',
            success: function(data){
                console.log('+++++++++++++++++');
                console.log(data);
                me.setState({dataSource:data.data.operator});
            }

        });
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
                </div>
            </div>
        );
    }
}

PagePermission.defaultProps = {};
export default PagePermission;