/**
 * Created by danyu on 3/7/16.
 */

let { Button, Icon, DatePicker, Row, Col, Table} = AntD;
let { RangePicker } = DatePicker;

const columns = [{
    title: '序号',
    dataIndex: 'num'
}, {
    title: '订单号',
    dataIndex: 'orderID'
}, {
    title: '油站',
    dataIndex: 'station'
}, {
    title: '交易类型',
    dataIndex: 'type'
}, {
    title: '金额',
    dataIndex: 'money'
},  {
    title: '时间',
    dataIndex: 'time'
}];

const data = [{
    key: '1',
    num: 123,
    orderID: 23123,
    station: '壳牌圆西路',
    type: '收款',
    money: 3213,
    time: '2016-2-1 15:01:10'
}, {
    key: '2',
    num: 123,
    orderID: 23123,
    station: '壳牌圆西路',
    type: '收款',
    money: 3213,
    time: '2016-2-1 15:01:10'
}, {
        key: '3',
        num: 123,
        orderID: 23123,
        station: '壳牌圆西路',
        type: '收款',
        money: 3213,
        time: '2016-2-1 15:01:10'
}];

class PageTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div id="pageTransaction">
                <section className='sec1-query'>
                    <div className='queryHeader'>交易查询</div>
                    <div className='queryContent'>
                        <table className='table-query'  cellSpacing="0" cellPadding='0'>
                            <tbody>
                            <tr><td className="table-query-header">订单号</td><td className="table-query-header">时间：</td></tr>
                            <tr><td><input type='text' style={{width:'15rem',marginTop:'10px'}}></input></td>
                                <td><RangePicker style={{ width: 400,marginTop:'10px' }} showTime format="yyyy/MM/dd HH:mm:ss"/></td>
                                <td><Button  type='primary' style={{marginTop:'10px'}}><Icon type="search"/>查询</Button></td>
                                <td><Button style={{marginTop:'10px'}}>导出交易记录</Button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className = 'sec2-statistic'>
                    <table cellSpacing="0" cellPadding='0'>
                        <tbody>
                            <tr>
                                <td>
                                    <div className='sec2-text'>收款笔数</div>
                                    <div className='sec2-num'>1223</div>
                                </td>
                                <td>
                                    <div className='sec2-text'>收款金额</div>
                                    <div className='sec2-num'>123123</div>
                                </td>
                                <td>
                                    <div className='sec2-text'>退款笔数</div>
                                    <div className='sec2-num'>324</div>
                                </td>
                                <td>
                                    <div className='sec2-text'>退款金额</div>
                                    <div className='sec2-num'>8024</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </section>
                <section className='sec3-table'>
                    <Table columns={columns} dataSource={data} />
                    <span className='total_records'>共 50 条记录</span>
                </section>
            </div>
        )
    }
}

export default PageTransaction;