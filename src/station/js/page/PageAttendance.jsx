import CommonData from '../common/CommonData.js';
import AttendanceSelect from '../component/AttendanceSelect.jsx';
import AttendanceStats from '../component/AttendanceStats.jsx';
import LoginStore from '../stores/GlobalStore.js';

class PageAttendance extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="pageAttendance">
                <div>
                    <div className='queryHeader'>班次查询</div>
                    <AttendanceSelect data={LoginStore.loginData.data.stations}/>
                </div>
                <AttendanceStats/>
            </div>
        );
    }
}


export default PageAttendance;
