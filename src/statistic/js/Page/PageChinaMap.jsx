/**
 * Created by danyu on 3/31/16.
 */

let MapComponent = require('../component/MapComponent.jsx');

class PageChinaMap extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let mapConfig = {titleTop:'5%',titleText:'China Users Distribution'}
        return(
            <MapComponent mapType='china' reqUrl='chinamap' mapConfig={mapConfig}/>
        )
    }
}

export default PageChinaMap;