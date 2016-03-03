var backStore = require('./PageBackStore.js');
var carlife = require('./CarlifeNative.js');

var PageBase = {
    mixins: [
        Reflux.listenTo(backStore, 'handleBackPressed')
    ],

    handleBackPressed: function () {
        if (this.onBackPressed && this.onBackPressed()) {
            // back handled
            console.log('onBackPressed: true');
        } else {
            console.log('onBackPressed: default');
            back();
        }
    },

    componentWillUpdate: function () {
        if (this.onPageResult && this.props.$response) {
            this.onPageResult(this.props.$request, this.props.$response);
        }
    }

};

module.exports = PageBase;
