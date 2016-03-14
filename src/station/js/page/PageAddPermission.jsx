/**
 * @file 新增/修改 权限
 * Created by jinjiaxing on 16/3/9.
 */

import CommonData from '../common/CommonData';
import LoginStore from '../stores/GlobalStore';
import LoginAction from '../actions/GlobalAction';
import Query from '../Query.js';

let { Button , Select } =AntD;
const Option = Select.Option;

class PageAddPermission extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actionName: '新增人员',
            userName: '',
            phone: '',
            stationId: '',
            stations: [],
        };

        if (LoginStore.loginData.data && LoginStore.loginData.data.stations) {
            this.state.stations = LoginStore.loginData.data.stations;
            console.debug('已经存在 stations=', this.state.stations);
        } else {
            LoginAction.updateLoginState();
            LoginStore.listen(this.onUpdateLoginState.bind(this));
        }
    }

    /**
     * 获取用户信息油站列表
     *
     * @param data 用户信息数据
     */
    onUpdateLoginState(data) {
        console.debug('重新获取的', data.data.stations);
        this.setState({stations: data.data.stations});
    }

    /**
     * 取消操作
     *
     */
    cancelHandler() {
        var url = {pathname: '/pagepermission'};
        this.context.router.push(url);
    }

    /**
     * 保存操作
     *
     */
    saveHandler() {
        let info = this.props.location;

        let name = this.state.userName;
        let phone = this.state.phone;
        let station = this.state.stationId;

        // 编辑
        var reqData = {name: name, phone: phone, station_id: station};
        Query.post(oilConst.reqOperatorSave, reqData, function (data) {
            console.debug('新加权限:', data);
        }.bind(this));
    }

    /**
     * 姓名change
     *
     * @param e 操作对象
     */
    userNameChange(e) {
        this.setState({userName: e.target.value});
    }

    /**
     * 电话change
     *
     * @param e 操作对象
     */
    phoneChange(e) {
        this.setState({phone: e.target.value});
    }

    /**
     * 选择油站时触发
     *
     * @param value id值
     * @param label 显示文字
     */
    stationChange(value, label) {
        this.setState({stationId: value});
    }

    render() {

        let optionArray = [];

        if (this.state.stations) {
            let stationInfo = this.state.stations;
            for (let i = 0; i < stationInfo.length; i++) {
                let optionDom = (<Option key={stationInfo[i].station_id}
                                         value={stationInfo[i].station_id}>{stationInfo[i].name}</Option>);
                optionArray.push(optionDom);
            }
        } else {
            console.debug('尚未取到油站列表');
        }

        return (
            <div id='pageAddPermission'>
                <div className="pageAddPermission_Header">
                    <h1 className="headtext">权限管理 >></h1>
                    <span>{this.state.actionName}</span>
                </div>
                <div className="pageAddPermission_Body">
                    <div className="pageAddPermission_container">
                        <label>姓名</label>
                        <input onChange={this.userNameChange.bind(this)} type="text"
                               value={this.state.userName}></input>
                        <label>手机号</label>
                        <input onChange={this.phoneChange.bind(this)} type="text" value={this.state.phone}/>
                        <label>管辖油站</label>
                        <Select ref='selStation' defaultValue={this.state.stationId} style={{ width: 316 }}
                                onChange={this.stationChange.bind(this)}>
                            {optionArray}
                        </Select>
                        <Button onClick={this.saveHandler.bind(this)} className="headButton" type="primary"
                                size="large">
                            保存
                        </Button>
                        <Button onClick={this.cancelHandler.bind(this)} className="headButton" type="primary"
                                size="large">
                            取消
                        </Button>
                    </div>
                </div>
            </div>

        );
    }
}
PageAddPermission.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};

export default PageAddPermission;