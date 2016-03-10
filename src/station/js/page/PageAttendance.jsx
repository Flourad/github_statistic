const {Table, Select, DatePicker, Button, Icon} = AntD;
const {Option} = Select;
import Query from '../Query.js';
import CommonData from '../common/CommonData.js';
import actionQueryAttendance from '../actions/AttendanceAction.jsx';
import storeQueryAttendance from '../stores/AttendanceStore.jsx';

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
        render(text) {
            return <a href="#">{text}</a>;
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
            return formatDate(text);
        }
    },
    {
        key: 'check-out',
        title: '下班时间',
        dataIndex: 'offwork_time',
        render(text) {
            return formatDate(text);
        }
    }
];

const OPTIONS = {hour12: false};
function formatDate(seconds) {
    const date = new Date(seconds * 1000);
    return date.toLocaleString('zh-Hans-CN', OPTIONS);
}

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
        this.setState({loading: true});
        Query.get(oilConst.reqAttendance, params, this.parseData);
    }

    parseData(result) {
        //console.log('attendance: ' + JSON.stringify(result));
        const pagination = this.state.pagination;
        pagination.total = result.data.page.total;
        this.setState({
            loading: false,
            data: result.data.items,
            pagination
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
            <Table columns={columns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
                rowKey={record => record.squad_id} />
        );
    }
};


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

class AttendanceSelect extends React.Component {
    constructor(props) {
        super(props);

        this.children = [];
        props.data.forEach(function (station) {
            this.children.push(<Option key={station.station_id}>{station.name}</Option>);
        }.bind(this));
        this.station = props.data[0].station_id;

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
        //this.props.onQuery(this.station, this.startTime, this.endTime);
        let condition = {stationId: this.station, startTime: this.startTime, endTime: this.endTime};
        actionQueryAttendance.conditionUpdate(condition);
    }

    render() {
        return (
            <div className="dis-box">
                <Select style={{ width: 400 }} placeholder="请选择油站" onChange={this.onStationChange}>
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

export default Attendance;
