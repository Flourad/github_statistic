/**
 * Created by zruof on 16/3/9.
 */
import Query from '../Query.js'

let { Button, Icon, DatePicker, Row, Col, Table} = AntD;
let { RangePicker } = DatePicker;

const data = [{
    orderID: 145743448459814939,
    type: '已取消',
    time: '2016-2-1 15:01:10',
    money: 200,
    oilGun: '1',
    oilNum: '92#',
    carNum: '京N43223'
}];

Date.prototype.format = function () {
    var y = this.getFullYear();
    var m = bit_format(this.getMonth() + 1);
    var d = bit_format(this.getDate());
    var h = bit_format(this.getHours());
    var mins = bit_format(this.getMinutes());
    var secs = bit_format(this.getSeconds());

    return y + '-' + m + '-' + d + " " + h + ":" + mins + ':' + secs;
}

function bit_format(origin) {
    return (origin > 9 ? origin : '0' + origin);
}



class PageTransactionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oilstation: '',
            oilTransactionDetails: {
                ID: '',
                status: '',
                time: '',
                money: '',
                ganNum: '',
                oilNum: '',
                carNum: ''
            }

        };
        console.log(this.props.params.stationID);
        console.log(this.props.params.orderID);
        var stationID = this.props.params.stationID;
        var ordreID = this.props.params.orderID;
    }

    getTransactionDetails() {
        var order_id = this.refs.orderID?this.refs.orderID.value:'';
        var station_id = this.refs.stationID?this.refs.stationID.value:'';

        var reqData = {
            order_id: order_id,
            station_id: station_id
        };

        this.setState({loading: true});
        Query.get(oilConst.reqTransactionInfo, reqData, function(data) {
            this.setState({loading: false});
            if (data && data.data) {
                console.log('取得订单详情:', data.data);
                this.setState({oilstation: data.data.oil_station_name});
                this.setState( {
                    oilTransactionDetails: {
                        ID: data.data.order_id,
                        status: data.data.status,
                        time: new Data(data.data.pay_time).format(),
                        money: data.data.total_amount,
                        ganNum: data.data.gun_no,
                        oilNum: data.data.oil_no,
                        carNum: data.data.car_no
                    }
                });

            } else {
                console.log('订单详情为空');
            }
        }.bind(this));
    }

    render() {
        return(
            <div id="pageTransactionDetails">
                <section className='sec1-query'>
                    <div className='queryHeader'>订单详情</div>
                    <table className='queryContent'>
                        <tbody>
                        <tr>
                            <td>订单号</td>
                            <td>{this.state.oilTransactionDetails.ID}</td>
                            <td>订单状态</td>
                            <td>{this.state.oilTransactionDetails.status}</td>
                        </tr>
                        <tr>
                            <td>下单时间</td>
                            <td>{this.state.oilTransactionDetails.time}</td>
                            <td>下单金额</td>
                            <td>{this.state.oilTransactionDetails.money}元</td>
                        </tr>
                        <tr>
                            <td>油枪号</td>
                            <td>{this.state.oilTransactionDetails.ganNum}</td>
                            <td>油品号</td>
                            <td>{this.state.oilTransactionDetails.oilNum}#</td>
                        </tr>
                        <tr>
                            <td>车牌号</td>
                            <td>{this.state.oilTransactionDetails.carNum}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </section>
                <section className="sec2-oilstation">
                    <table cellSpacing="0" cellPadding='0'>
                        <tbody>
                        <tr>
                            <td>油站</td>
                        </tr>
                        <tr>
                            <td>名称：<a href="">{this.state.oilstation}</a></td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
}

export default PageTransactionDetails;