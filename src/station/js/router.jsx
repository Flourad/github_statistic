/**
 * Created by danyu on 3/4/16.
 */

import App from './Main.jsx';
import Transaction from './page/PageTransaction.jsx';
import Pagepermission from './page/PagePermission.jsx';
import PageAddPermission from './page/PageAddPermission.jsx'
import Attendance from './page/PageAttendance.jsx'

let {Router,Route,hashHistory,IndexRoute } =ReactRouter;

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Transaction}/>
            <Route path='transaction' component={Transaction}/>
            <Route path='pagepermission' component={Pagepermission}/>
            <Route path='pageaddpermission' component={PageAddPermission}/>
            <Route path='attendance' component={Attendance}/>
        </Route>
    </Router>
    , document.getElementById('container'));
