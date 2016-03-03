var PageSlider = require('./pageslider.jsx');
var carlife = require('./CarlifeNative.js');

function wrap(handler) {
    return function (action, args) {
        var ret = handler.call(undefined, action, args);
        if (action === 'back' && !ret) {
            if (ret === undefined) {
                carlife.requestFinish();
            }
        }
        return ret;
    };
}

module.exports = {

    mixins: [PageSlider],

    componentDidMount: function () {
        router.addDefault(wrap(function () {
            console.log('default route...');
        }.bind(this)));
    },

    addRoute: function (route, reactClass, id) {
        id = id || reactClass.displayName;
        router.addRoute(route, wrap(function (action, args) {
            return this.slidePage({pageClass: reactClass, args: args, id: id}, action);
        }.bind(this)));
    },

    start: function () {
        router.start();
    }

};