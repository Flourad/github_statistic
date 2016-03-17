const {Table} = AntD;
import Query from '../Query.js';
import Util from '../common/Util.js'
import storeQueryAttendance from '../stores/AttendanceStore.jsx';
const { Link } = ReactRouter;

class AttendanceStats extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pagination: {showTotal: this.showTotal},
            loading: false
        };

        this.handleTableChange = this.handleTableChange.bind(this);
        this.fetch = this.fetch.bind(this);
        this.parseData = this.parseData.bind(this);

        this.onConditionUpdate = this.onConditionUpdate.bind(this);
        storeQueryAttendance.listen(this.onConditionUpdate);

        this.handleError = this.handleError.bind(this);
    }

    onConditionUpdate(condition) {
        console.log('update: ' + JSON.stringify(condition));

        const pager = this.state.pagination;
        pager.current = 1;
        pager.size = 10;

        this.setState({
            pagination: pager
        });

        const params = {
            size: pager.size,
            page: pager.current,
            station_id: condition.stationId,
            start_date: condition.startTime,
            end_date: condition.endTime
        };

        this.fetch(params);
    }

    showTotal(total) {
        return '共'+total+'条';
    }

    handleTableChange(pagination) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.size = 10;

        this.setState({
            pagination: pager
        });

        const params = {
            size: pagination.pageSize,
            page: pagination.current,
            station_id: storeQueryAttendance.condition.stationId,
            start_date: storeQueryAttendance.condition.startTime,
            end_date: storeQueryAttendance.condition.startTime
        };

        this.fetch(params);
    }

    fetch(params = {}) {
        if (params.station_id) {
            this.setState({loading: true});
            Query.get(oilConst.reqAttendance, params, this.parseData, this.handleError);
        }
    }

    parseData(result) {
        //console.log('attendance: ' + JSON.stringify(result));
        const pagination = this.state.pagination;
        pagination.total = result.data.page.total;
        this.setState({
            loading: false,
            data: result.data.items,
            pagination: pagination
        });
    }

    handleError(result) {
        this.setState({
            loading: false,
            data: [],
        });
    }

    componentDidMount() {
        const params = {
            station_id: storeQueryAttendance.condition.stationId,
            start_date: storeQueryAttendance.condition.startTime,
            end_date: storeQueryAttendance.condition.endTime
        };
        this.fetch(params);
    }

    render() {
        return (
            <div className="queryBody">
                <Table columns={columns}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleTableChange}
                       rowKey={record => record.squad_id}
                       useFixedHeader />
            </div>
        );
    }
};

const columns = [
    {
        key: 'id',
        title: '序号',
        render(text, record, index) {
            return index + 1;
        }
    },
    {
        key: 'number',
        title: '班次号',
        dataIndex: 'squad_id',
        render(text, record) {
            return <Link to={`pageAttendanceDetail/${record.station_id}/${record.squad_id}`}>{text}</Link>
        }
    },
    {
        key: 'status',
        title: '状态',
        dataIndex: 'squad_status',
        render(text) {
            let status = text;
            if (text === '1') {
                status = '未结';
            } else if (text === '2') {
                status = '已结';
            }
            return status;
        }
    },
    {
        key: 'check-in',
        title: '上班时间',
        dataIndex: 'signin_time',
        render(text) {
            let date = new Date();
            date.setTime(text * 1000);
            return date.format();
        }
    },
    {
        key: 'check-out',
        title: '下班时间',
        dataIndex: 'offwork_time',
        render(text) {
            let date = new Date();
            date.setTime(text * 1000);
            return date.format();
        }
    }
];


export default AttendanceStats;
