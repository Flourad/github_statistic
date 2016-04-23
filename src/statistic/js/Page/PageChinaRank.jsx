/**
 * Created by danyu on 4/2/16.
 */

let RankComponent = require('../component/RankComponent.jsx');

class PageChinaRank extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <RankComponent type='chinaRank' reqUrl='githubchina'/>
        )
    }

}

export default PageChinaRank;