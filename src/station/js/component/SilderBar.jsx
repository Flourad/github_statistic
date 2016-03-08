/**
 * Created by jinjiaxing on 16/3/7.
 * SilderBar 屏幕左侧导航条
 */
let {Menu} = AntD;
let { SubMenu } = Menu;
let { Link } = ReactRouter;

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
                        <Link to='transaction'>
                            <i className="iconImage icon-trselect"></i>
                            <label className='usertext'>{this.constText.trSelect}</label>
                        </Link>}>
                        </SubMenu>

                        <SubMenu
                            title={
                        <Link to='/#/b'>
                            <i className="iconImage icon-trclassselect"></i>
                            <label className='usertext'>{this.constText.trClassSelect}</label>
                        </Link>}>
                        </SubMenu>
                    </Menu>
                </div>

                <div>
                    <label className="menuGroup">{this.constText.operate}</label>
                    <Menu mode="vertical" theme="dark">
                        <SubMenu
                            title={
                        <Link to='/#/c'>
                            <i className="iconImage icon-opexpand"></i>
                            <label className='usertext'>{this.constText.opExpand}</label>
                        </Link>}>
                        </SubMenu>

                        <SubMenu
                            title={
                        <Link to='/#/d'>
                            <i className="iconImage icon-opnearbyuser"></i>
                            <label className='usertext'>{this.constText.opNearByUser}</label>
                        </Link>}>
                        </SubMenu>
                    </Menu>
                </div>

                <div>
                    <label className="menuGroup">{this.constText.oilManagement}</label>
                    <Menu mode="vertical" theme="dark">
                        <SubMenu
                            title={
                        <Link to='pagepermission'>
                            <i className="iconImage icon-accessmanagement"></i>
                            <label className='usertext'>{this.constText.accessManagement}</label>
                        </Link>}>
                        </SubMenu>

                    </Menu>
                </div>
            </div>
        );
    }

}

SilderBar.defaultProps = {};

//ReactDOM.render(<SilderBar />, document.getElementById('silderbar'));
export default SilderBar;
