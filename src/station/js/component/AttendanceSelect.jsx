const {Select, DatePicker, Button, Icon} = AntD;
const {Option} = Select;
import actionQueryAttendance from '../actions/AttendanceAction.jsx';

class AttendanceSelect extends React.Component {
    constructor(props) {
        super(props);

        this.children = [];
        props.data.forEach(function (station) {
            this.children.push(<Option key={station.station_id}>{station.name}</Option>);
        }.bind(this));

        this.onStartTimeChange = this.onStartTimeChange.bind(this);
        this.onEndTimeChange = this.onEndTimeChange.bind(this);
        this.onStationChange = this.onStationChange.bind(this);
        this.onQuery = this.onQuery.bind(this);
    }

    disabledDate(current) {
        // can not select days after today
        return current && current.getTime() > Date.now();
    }

    onStartTimeChange(time) {
        this.startTime = time ? time.toUTCString() : '';
    }

    onEndTimeChange(time) {
        this.endTime = time ? time.toUTCString() : '';
    }

    onStationChange(name) {
        this.station = name;
    }

    onQuery() {
        let condition = {stationId: this.station, startTime: this.startTime, endTime: this.endTime};
        actionQueryAttendance.conditionUpdate(condition);
    }

    render() {
        return (
            <div className="dis-box">
                <Select style={{ width: '300px'}} placeholder="请选择油站" onChange={this.onStationChange}>
                    {this.children}
                </Select>
                <DatePicker onChange={this.onStartTimeChange} placeholder="开始日期" disabledDate={this.disabledDate}></DatePicker>
                至
                <DatePicker onChange={this.onEndTimeChange} placeholder="结束日期" disabledDate={this.disabledDate}></DatePicker>
                <Button type="primary" onClick={this.onQuery}>
                    <Icon type="search" />
                    查询
                </Button>
            </div>
        );
    }
}

export default AttendanceSelect;
