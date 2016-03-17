import Query from '../Query.js';

const {Table} = AntD;
const { Link } = ReactRouter;

class AttendanceDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: undefined,
            pagination: {
                current: 1,
                size: 10
            },
            loading: false,
            statistic_info: {
                pay_count: 0,
                pay_total: 0,
                refund_count: 0,
                refund_total: 0
            }
        };

        this.fetch = this.fetch.bind(this);
        this.parseData = this.parseData.bind(this);
    }

    componentDidMount() {
        const params = {
            station_id: this.props.params.stationId,
            shiftNo: this.props.params.attendanceId
        };
        this.fetch(params);
    }

    fetch(params = {}) {
        this.setState({loading: true});
        console.log('detail params: ' + JSON.stringify(params));
        Query.get(oilConst.reqAttendanceDetail, params, this.parseData);
    }

    parseData(result) {
        const pagination = this.state.pagination;
        pagination.total = result.data.page.total;
        let summary = result.data.summary;

        this.setState({
            loading: false,
            dataSource: result.data.items,
            pagination: pagination,

            statistic_info: {
                pay_count: summary.pay_count,
                pay_total: summary.pay_total,
                refund_count: summary.refund_count,
                refund_total: summary.refund_total
            }
        });
    }

    render() {
        return (
            <div id="pageTransaction">
                <section className='sec1-query'>
                    <div className='queryHeader'>班次详情</div>
                </section>
                <section className='sec2-statistic'>
                    <table cellSpacing="0" cellPadding='0'>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='sec2-text'>收款笔数</div>
                                    <div className='sec2-num'>{this.state.statistic_info.pay_count}</div>
                                </td>
                                <td>
                                    <div className='sec2-text'>收款金额</div>
                                    <div className='sec2-num'>{this.state.statistic_info.pay_total}</div>
                                </td>
                                <td>
                                    <div className='sec2-text'>退款笔数</div>
                                    <div className='sec2-num'>{this.state.statistic_info.refund_count}</div>
                                </td>
                                <td>
                                    <div className='sec2-text'>退款金额</div>
                                    <div className='sec2-num'>{this.state.statistic_info.refund_total}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className='sec3-table'>
                    <Table
                        columns={columns}
                        dataSource={this.state.dataSource}
                        loading={this.state.loading}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange.bind(this)}
                        rowKey={record => record.id}
                        useFixedHeader />
                    <span className='total_records'>共 <i style={{color:"red"}}>{this.state.pagination.total}</i> 条记录</span>
                </section>
            </div>
        )
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
            station_id: this.props.params.stationId,
            shiftNo: this.props.params.attendanceId
        };

        this.fetch(params);
    }
}


const columns = [
    {
        title: '序号',
        dataIndex: 'num',
        key: 'num',
        width: 200,
        render(text, record, index) {
            return index+1;
        }
    },
    {
        title: '订单号',
        dataIndex: 'order_id',
        key: 'order_id',
        width: 300,
        render(text, record, index) {
            return <Link to={`pageTransactionDetail/${record.station_id}/${record.order_id}`}>{text}</Link>;
        }
    },
    {
        title: '油站',
        dataIndex: 'name',
        key: 'name',
        width: 300
    },
    {
        title: '交易类型',
        dataIndex: 'type',
        width:200,
        key: 'type',
        render(text, record, index) {
            return text === '1' ? '收款' : '退款';
        }
    },
    {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        width: 200
    },
    {
        title: '时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render(text, record, index) {
            var d = new Date(text * 1000);
            return d.format();
        }
    }];

    export default AttendanceDetail;
