/**
 * @file 新增/修改 权限
 * Created by jinjiaxing on 16/3/9.
 */
let { Button } =AntD;

class PageAddPermission extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            action:'add',
            actionName:'新增人员'
        };
        if(this.props.location.state){
            console.debug(this.props.location.state);
        }

    }

    render(){
        // 取出路由传递的参数
        //console.log(this.props.location.state);

        return (
            <div id='pageAddPermission'>
                <div className="pageAddPermission_Header">
                    <h1 className="headtext">权限管理 >></h1>
                    <span>{this.state.actionName}</span>
                </div>
                <div className="pageAddPermission_Body">
                    <div className="pageAddPermission_container">
                        <label>姓名</label>
                        <input type="text"/>
                        <label>手机号</label>
                        <input type="text"/>
                        <label>管辖油站</label>
                        <input type="text"/>
                        <Button  className="headButton" type="primary" size="large">
                            保存
                        </Button>
                        <Button  className="headButton" type="primary" size="large">
                            取消
                        </Button>
                    </div>
                </div>
            </div>

        );
    }
}

export default PageAddPermission;