/**
 * Created by danyu on 3/4/16.
 */

import App from './Main.jsx';
import PageChinaMap from './component/PageChinaMap.jsx';
import PageWorldMap from './component/PageWorldMap.jsx';
import PageChinaRank from './component/PageChinaRank.jsx';
import PageWorldRank from './component/PageWorldRank.jsx';

let {Router,Route,hashHistory,IndexRoute} =ReactRouter;

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={PageChinaMap}/>
            <Route path='chinaMap' component={PageChinaMap}/>
            <Route path='worldMap' component={PageWorldMap}/>
            <Route path='chinaRank' component={PageChinaRank}/>
            <Route path='worldRank' component={PageWorldRank}/>
        </Route>
    </Router>
    , document.getElementById('container'));
