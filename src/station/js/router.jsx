/**
 * Created by danyu on 3/4/16.
 */

import App from './Main.jsx';
import Transaction from './page/PageTransaction.jsx';

let {Router,Route,browserHistory,IndexRoute } =ReactRouter;

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <Route path='transaction' component={Transaction}/>
        </Route>
    </Router>
    , document.getElementById('container'));
