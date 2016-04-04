/**
 * Created by danyu on 4/2/16.
 */
let RankComponent = require('../component/RankComponent.jsx');

class PageWorldRank extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <RankComponent reqUrl='githubworld'/>
        )
    }
}

export default PageWorldRank;