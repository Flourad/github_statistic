import CommonData from '../common/CommonData.js';
import AttendanceSelect from '../component/AttendanceSelect.jsx';
import AttendanceStats from '../component/AttendanceStats.jsx';

class Attendance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            station: CommonData.loginData.data.stations[0].station_id,
            startTime: '',
            endTime: ''
        };
    }

    render() {
        return (
            <div>
                <p>班次查询</p>
                <AttendanceSelect data={CommonData.loginData.data.stations}/>
                <AttendanceStats/>
            </div>
        );
    }
}


export default Attendance;
