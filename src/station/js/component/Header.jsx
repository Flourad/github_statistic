/**
 * Created by jinjiaxing on 16/3/4.
 * header 组件
 */

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div className="logoContainer">
                    <div className="logo icon-baidulogo"></div>
                    <label> | 商户管理中心</label>
                </div>
                <div className="userInfo">
                    userInfo
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Header />, document.getElementById('header'));


