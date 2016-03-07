/**
 * Created by danyu on 3/4/16.
 */

import App from './Main.jsx';
import Transaction from './page/PageTransaction.jsx';

let {Router,Route,hashHistory,IndexRoute } =ReactRouter;

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <Route path='transaction' component={Transaction}/>
        </Route>
    </Router>
    , document.getElementById('container'));
