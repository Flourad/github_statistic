/**
 * Created by danyu on 3/4/16.
 */

import { Router, Route, hashHistory, browserHistory ,IndexRoute } from 'react-router';
import App from './Main.jsx';

ReactDOM.render(
    <Router history = {browserHistory}>
        <Route path='/' component = {App}>
        </Route>
    </Router>
    , document.getElementById('container'));
