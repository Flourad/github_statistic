/**
 * Created by jinjiaxing on 16/3/7.
 * SilderBar 屏幕左侧导航条
 */
let {Menu} = AntD;
let { SubMenu } = Menu;

class SilderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.constText = {
            trManagement: '交易管理',
            trSelect: '交易查询',
            trClassSelect: '班次查询',
            operate: '运营管理',
            opExpand: '推广效果',
            opNearByUser: '周边用户',
            oilManagement: '油站管理',
            accessManagement: '权限管理'
        }
    }

    render() {
        return (
            <div id="silderBarComponent">
                <div>
                    <label className="menuGroup">{this.constText.trManagement}</label>
                    <Menu mode="vertical" theme="dark">
                        <SubMenu
                            title={
                        <a href='/#/a'>
                            <i className="iconImage icon-trselect"></i>
                            <label className='usertext'>{this.constText.trSelect}</label>
                        </a>}>
                        </SubMenu>

                        <SubMenu
                            title={
                        <a href='/#/b'>
                            <i className="iconImage icon-trclassselect"></i>
                            <label className='usertext'>{this.constText.trClassSelect}</label>
                        </a>}>
                        </SubMenu>
                    </Menu>
                </div>

                <div>
                    <label className="menuGroup">{this.constText.operate}</label>
                    <Menu mode="vertical" theme="dark">
                        <SubMenu
                            title={
                        <a href='/#/c'>
                            <i className="iconImage icon-opexpand"></i>
                            <label className='usertext'>{this.constText.opExpand}</label>
                        </a>}>
                        </SubMenu>

                        <SubMenu
                            title={
                        <a href='/#/d'>
                            <i className="iconImage icon-opnearbyuser"></i>
                            <label className='usertext'>{this.constText.opNearByUser}</label>
                        </a>}>
                        </SubMenu>
                    </Menu>
                </div>

                <div>
                    <label className="menuGroup">{this.constText.oilManagement}</label>
                    <Menu mode="vertical" theme="dark">
                        <SubMenu
                            title={
                        <a href='/#/e'>
                            <i className="iconImage icon-accessmanagement"></i>
                            <label className='usertext'>{this.constText.accessManagement}</label>
                        </a>}>
                        </SubMenu>

                    </Menu>
                </div>
            </div>
        );
    }

}

SilderBar.defaultProps = {};

ReactDOM.render(<SilderBar />, document.getElementById('silderbar'));