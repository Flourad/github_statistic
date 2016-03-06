/**
 * Created by danyu on 3/4/16.
 */

import App from './Main.jsx';

let {Router,Route,hashHistory,browserHistory,IndexRoute } =ReactRouter;

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}>
        </Route>
    </Router>
    , document.getElementById('container'));
