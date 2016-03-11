import CommonData from '../common/CommonData.js';
import AttendanceSelect from '../component/AttendanceSelect.jsx';
import AttendanceStats from '../component/AttendanceStats.jsx';

class PageAttendance extends React.Component {
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
            <div id="pageAttendance">
                <div>
                    <div className='queryHeader'>班次查询</div>
                    <AttendanceSelect data={CommonData.loginData.data.stations}/>
                </div>

                <AttendanceStats/>
            </div>
        );
    }
}


export default PageAttendance;
