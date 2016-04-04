/**
 * Created by danyu on 3/4/16.
 */

import App from './Main.jsx';
import PageChinaMap from './page/PageChinaMap.jsx';
import PageWorldMap from './page/PageWorldMap.jsx';
import PageChinaRank from './page/PageChinaRank.jsx';
import PageWorldRank from './page/PageWorldRank.jsx';

let {Router,Route,hashHistory,IndexRoute,browserHistory} =ReactRouter;

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={PageChinaMap}/>
            <Route path='chinamappage' component={PageChinaMap}/>
            <Route path='worldmappage' component={PageWorldMap}/>
            <Route path='chinarankpage' component={PageChinaRank}/>
            <Route path='worldrankpage' component={PageWorldRank}/>
        </Route>
    </Router>
    , document.getElementById('container'));
