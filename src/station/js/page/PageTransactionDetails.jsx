/**
 * Created by zruof on 16/3/9.
 */
import Query from '../Query.js'

let { Button, Icon, DatePicker, Row, Col, Table} = AntD;
let { RangePicker } = DatePicker;

class PageTransactionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oilstation: '',
            oilTransactionDetails: {
                ID: '',
                time: '',
                money: '',
                ganNum: '',
                oilNum: '',
                carNum: ''
            },
            status: '',
            stationID: this.props.params.stationID,
            ordreID: this.props.params.orderID
            //stationID: 8,
            //ordreID: 145619762930896433
        };
        console.log(this.props.params.stationID);
        console.log(this.props.params.orderID);

        this.getTransactionDetails();
    }

    //componentWillMount() {
    //    //this.getTransactionDetails();
    //}

    getTransactionDetails() {
        var order_id = this.state.ordreID?this.state.stationID.value:'';
        var station_id = this.state.stationID?this.state.stationID.value:'';

        var reqData = {
            order_id: this.state.ordreID,
            station_id: this.state.stationID
        };

        Query.get(oilConst.reqTransactionInfo, reqData, function(data) {
            this.setState({loading: false});
            console.log('取得订单详情:', data.data);
            if (data && data.data) {
                console.log('取得订单详情:', data.data);
                this.setState({oilstation: data.data.oil_station_name});
                this.setState( {
                    oilTransactionDetails: {
                        ID: data.data.order_id,
                        time: new Date(data.data.pay_time*1000).format(),
                        money: data.data.total_amount,
                        ganNum: data.data.gun_no,
                        oilNum: data.data.oil_no,
                        carNum: data.data.car_no
                    }
                });
                this.getDetailsStatus(data.data.status);
            } else {
                console.log('订单详情为空');
            }
        }.bind(this));
    }

    getDetailsStatus(status){
        switch (status){
            case '1':
                this.setState({status: '待支付'});
                break;
            case '2':
                this.setState({status: '支付成功'});
                break;
            case '3':
                this.setState({status: '支付失败'});
                break;
            case '4':
                this.setState({status: '已完成'});
                break;
            case '5':
                this.setState({status: '退款处理中'});
                break;
            case '6':
                this.setState({status: '退款成功'});
                break;
            case '7':
                this.setState({status: '退款失败'});
                break;
            case '8':
                this.setState({status: '退款被拒绝'});
                break;
            case '9':
                this.setState({status: '退款已同意'});
                break;
            case '10':
                this.setState({status: '退款进行中'});
                break;
            case '11':
                this.setState({status: '已取消'});
                break;
        }
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
                            <td>{this.state.status}</td>
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