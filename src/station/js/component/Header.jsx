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
                This is Header
                <div style={{width:'20px',height:'20px'}} className="icon-user"></div>
            </div>
        );
    }
}

ReactDOM.render(<Header />, document.getElementById('header'));


