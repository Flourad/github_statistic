import actionQueryAttendance from '../actions/AttendanceAction.jsx';
import storeLogin from './GlobalStore.js';

const STORE_ATTENDANCE_CONDITION = Reflux.createStore({
    init: function() {
        this.listenTo(storeLogin, this.update);
    },

    condition: {
        stationId: '',
        stationName: '',
        startTime: '',
        endTime: ''
    },

    listenables: actionQueryAttendance,

    onConditionUpdate: function (conditionNew) {
        this.condition = conditionNew;
        this.trigger(this.condition);
    },

    update: function (userInfo) {
        if (userInfo && userInfo.errno === 0 && userInfo.errstr === "ok") {
            if (userInfo.data && userInfo.data.stations && userInfo.data.stations.length > 0) {
                this.condition.stationId = userInfo.data.stations[0].station_id;
                this.condition.stationName = userInfo.data.stations[0].name;
                this.trigger(this.condition);
            }
        }
    }
});

export default STORE_ATTENDANCE_CONDITION;
