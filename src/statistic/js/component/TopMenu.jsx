let {Menu} = AntD;
let { Link } = ReactRouter;

class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'menu1'
        };
        this.constText = {
            chinaMap: 'ChinaLocation',
            worldMap: 'WorldLocation',
            chinaRank: 'ChinaRank',
            worldRank: 'WorldRank'
        }
    }
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    }
    render() {
        console.log('rrrrrrrrrrrr',window.location,window.location.href);
        let path = window.location.pathname;
        console.log(path);
        return (
            <div id="topMenu">
            <Menu mode="horizontal">
                <Menu.Item key='menu1' className={path === '/chinamappage'|| path === '/' ?'mycurrent':''}>
                    <Link to='chinamappage'>{this.constText.chinaMap}</Link>
                </Menu.Item>

                <Menu.Item key='menu2' className={path === '/worldmappage'?'mycurrent':''}>
                    <Link to='worldmappage'>{this.constText.worldMap}</Link>
                </Menu.Item>

                <Menu.Item key='menu3' className={path === '/chinarankpage'?'mycurrent':''}>
                    <Link to='chinarankpage'>{this.constText.chinaRank}</Link>
                </Menu.Item>

                <Menu.Item key='menu4' className={path === '/worldrankpage'?'mycurrent':''}>
                    <Link to='worldrankpage'>{this.constText.worldRank}</Link>
                </Menu.Item>
            </Menu>
            </div>
        );
    }

}

export default TopMenu;
