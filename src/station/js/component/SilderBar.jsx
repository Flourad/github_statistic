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
                        <Menu.Item>
                            <Link to='transaction'>
                                <i className="iconImage icon-trselect"></i>
                                <label className='usertext'>{this.constText.trSelect}</label>
                                <i className="iconArrow icon-arrow"></i>
                            </Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to='pageAttendance'>
                                <i className="iconImage icon-trclassselect"></i>
                                <label className='usertext'>{this.constText.trClassSelect}</label>
                                <i className="iconArrow icon-arrow"></i>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>

                <div>
                    <label className="menuGroup">{this.constText.operate}</label>
                    <Menu mode="vertical" theme="dark">
                        <Menu.Item>
                            <Link to='/#/c'>
                                <i className="iconImage icon-opexpand"></i>
                                <label className='usertext'>{this.constText.opExpand}</label>
                                <i className="iconArrow icon-arrow"></i>
                            </Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link to='/#/d'>
                                <i className="iconImage icon-opnearbyuser"></i>
                                <label className='usertext'>{this.constText.opNearByUser}</label>
                                <i className="iconArrow icon-arrow"></i>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>

                <div>
                    <label className="menuGroup">{this.constText.oilManagement}</label>
                    <Menu mode="vertical" theme="dark">
                        <Menu.Item>
                            <Link to='pagepermission'>
                                <i className="iconImage icon-accessmanagement"></i>
                                <label className='usertext'>{this.constText.accessManagement}</label>
                                <i className="iconArrow icon-arrow"></i>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
        );
    }

}

SilderBar.defaultProps = {};

//ReactDOM.render(<SilderBar />, document.getElementById('silderbar'));
export default SilderBar;
