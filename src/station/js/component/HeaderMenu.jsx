/**
 * Created by jinjiaxing on 16/3/6.
 * HeaderMenu:用于Header内的menu组件
 * props: userName
 */

let { Menu, Icon } = AntD;
let { SubMenu } = Menu;

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick(e) {
        console.log('click ', e);
        alert('退出登录');
    }

    render() {
        return (
            <div id="headerMenu">
                <Menu mode="horizontal" onClick={this.handleClick.bind(this)}
                      style={{}}>
                    <SubMenu
                        title={
                        <span>
                            <i className='icon-user userimage'></i>
                            <label className='usertext'>{this.props.userName}</label>
                            <i className='icon-user_down usericon'></i>
                        </span>}>
                        <Menu.Item key="exit">退出登录</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

HeaderMenu.defaultProps = {userName: '尚未登录'};

export default HeaderMenu;
