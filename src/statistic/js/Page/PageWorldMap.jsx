/**
 * Created by danyu on 3/31/16.
 */

let MapComponent = require('../component/MapComponent.jsx');

class PageWorldMap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <MapComponent mapType='world' reqUrl='worldmap' mapConfig={{titleText:'World Users Distribution'}}/>
        )
    }
}

export default PageWorldMap;