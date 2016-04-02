let {Menu} = AntD;
let { Link } = ReactRouter;

class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: ''
        };
        this.constText = {
            chinaMap: 'chinaMap',
            worldMap: 'worldMap',
            chinaRank: 'chinaRank',
            worldRank: 'worldRank'
        }
    }
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    }
    render() {
        return (
            <div id="topMenu">
            <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
                <Menu.Item key='menu1'>
                    <Link to='chinaMap'>{this.constText.chinaMap}</Link>
                </Menu.Item>

                <Menu.Item key='menu2'>
                    <Link to='worldMap'>{this.constText.worldMap}</Link>
                </Menu.Item>

                <Menu.Item key='menu3'>
                    <Link to='chinaRank'>{this.constText.chinaRank}</Link>
                </Menu.Item>

                <Menu.Item key='menu4'>
                    <Link to='worldRank'>{this.constText.worldRank}</Link>
                </Menu.Item>
            </Menu>
            </div>
        );
    }

}

export default TopMenu;
