/**
 * Created by jinjiaxing on 16/3/3.
 * @file Main
 */

import TopMenu from './component/TopMenu.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{height:'100%'}}>
                <TopMenu id="topMenu"/>
                <div id="oilContent">
                    {this.props.children}
                </div>
            </div>

        );
    }

}

export default App;
