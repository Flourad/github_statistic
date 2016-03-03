//var router = require('./route-adapter.js');

//var Const = require('./Constant.js').Const;
//var entranceStore = require('./GlobalStore.js').entranceStore;
//var cityAction = require('./GlobalAction.js').cityAction;
//var statisticConst = require('./StatisticConstant.js');
//var CouponDetailPage = require('./PageCouponDetail.jsx');

var App = React.createClass({

    componentDidMount: function () {
        init();
    },

    render:function(){
        return (<h1>Hello</h1>);
    }
});







ReactDOM.render(<App />, document.getElementById('container'));
