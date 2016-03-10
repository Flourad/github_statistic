import actionQueryAttendance from '../actions/AttendanceAction.jsx';
const STORE_ATTENDANCE_CONDITION = Reflux.createStore({
    condition: {
        stationId: '',
        startTime: '',
        endTime: ''
    },

    listenables: actionQueryAttendance,

    onConditionUpdate: function (conditionNew) {
        this.condition = conditionNew;
        this.trigger(this.condition);
    }
});

export default STORE_ATTENDANCE_CONDITION;
