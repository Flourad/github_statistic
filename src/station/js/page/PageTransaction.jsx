/**
 * Created by danyu on 3/7/16.
 */
import Query from '../Query.js';
import TransactionAction from '../actions/TransactionAction.jsx';
import TransactionStore from '../stores/TransactionStore.jsx';
import LoginStore from '../stores/GlobalStore';
import LoginAction from '../actions/GlobalAction';

let { Button, Icon, DatePicker, Table, Transfer} = AntD;
let { RangePicker } = DatePicker;

class PageTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMore: false,
            dataSource: undefined,
            total: 0,
            pagination: {
                // 当前页
                current: 1,
                // 每页显示的条数
                size: 10
            },
            loading: false,
            statistic_info: {
                pay_count: '',
                pay_total: '',
                refund_count: '',
                refund_total: ''
            },
            stationList: TransactionStore.stationList,
            selectedStationList: TransactionStore.selectedStationList
        };

        var me = this;
        this.columns = [
            {
                title: '序号',
                dataIndex: 'num',
                key: 'num',
                render(text, record, index) {
                    return (
                        <span key={index}>{index+1}</span>
                    )
                }
            }, {
                title: '订单号',
                dataIndex: 'order_id',
                key: 'order_id',
                render(text, record, index) {
                    return (
                        <a onClick={me.goDetail.bind(me,text,record)}>{text}</a>
                    );
                }
            }, {
                title: '油站',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '交易类型',
                dataIndex: 'type',
                key: 'type',
                render(text, record, index) {
                    return (
                        <span key={index}>{text === '1' ? '收款' : '退款'}</span>
                    )
                }
            }, {
                title: '金额',
                dataIndex: 'amount',
                key: 'amount'
            }, {
                title: '时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render(text, record, index) {
                    var d = new Date(text * 1000);
                    return (
                        <span  key={index}>{d.format()}</span>
                    )
                }
            }];

        TransactionStore.listen(this.onUpdateStations.bind(this));

        if(LoginStore.loginData.data.stations&& LoginStore.loginData.data.stations.length > 0) {
            TransactionStore.stationList = LoginStore.loginData.data.stations.map((item, idx)=>({station_id:item.station_id,name:item.name}));
        } else {
            LoginAction.updateLoginState();
            LoginStore.listen(this.onUpdateStationInfo.bind(this));
        }
    }

    /**
     * table数据绑定key
     *
     * @param record 行数据
     * @returns {*}
     */
    getRowKey(record) {
        return record.id;
    }

    onUpdateStations(stations,type) {
        if(type===1) {
            console.log('updateStationList');
            this.setState({stationList:stations});
            TransactionStore.stationList = stations;
            var stations = this.state.stationList.map(item=>item.station_id);
            this.getTransactionList(this.state.pagination.size, this.state.pagination.current,stations);
        } else if(type===2) {
            console.log('updateSelectedStations');
            this.setState({selectedStationList: stations});
        }
    }

    onUpdateStationInfo(info) {
        var stations = info.data.stations.map((item, idx)=>({station_id:item.station_id,name:item.name}));
        TransactionAction.updateStationList(stations,1);
    }

    goDetail(text, record) {
        console.log(record);
        this.context.router.push(`pageTransactionDetail/${record.station_id}/${record.order_id}`);
    }


    componentWillMount() {
        if (TransactionStore.stationList  && TransactionStore.stationList.length>0) {
            var stations = TransactionStore.stationList.map(item=>item.station_id);
            this.getTransactionList(this.state.pagination.size, this.state.pagination.current,stations);
        }
    }

    selectAllHandler(ev) {
        if (this.refs.selectAll.checked) {
            TransactionAction.updateSelectedStations(this.state.stationList.map(item=>item.station_id),2);
        } else {
            TransactionAction.updateSelectedStations([],2);
        }
    }

    selectSingle(station_id) {
        var selectedStationList = TransactionStore.selectedStationList;
        if (selectedStationList.indexOf(station_id) === -1) {
            selectedStationList.push(station_id);
        } else {
            selectedStationList = selectedStationList.filter((item, index)=>(item != station_id))
        }
        TransactionAction.updateSelectedStations(selectedStationList,2);
    }
    queryHandler() {
        if (this.state.selectedStationList.length==0) {
            alert('选择油站不能为空哦，请重新选择~');
            return false;
        }
        const pager = this.state.pagination;
        pager.current = 1;
        pager.size = 10;

        this.setState({
            pagination: pager
        });
        this.getTransactionList(pager.size, pager.current,this.state.selectedStationList);
    }

    getTransactionList(size, page, stations) {
        // 取得操作员列表信息
        var stationList = stations;
        var order_id = this.refs.orderID?this.refs.orderID.value:'';
        var time_array = this.refs.time ? this.refs.time.state.value:'';
        var start_date = '';
        var end_date = '';
        if (time_array&&time_array[0]&&time_array[1]) {
            start_date = new Date(time_array[0].time).format();
            end_date = new Date(time_array[1].time).format();
        }

        var reqData = {
            size: size,
            page: page,
            stations: stations,
            order_id: order_id,
            start_date: start_date,
            end_date: end_date
        };
        this.setState({loading: true});
        Query.get(oilConst.reqTransactionList, reqData, function (data) {
            this.setState({loading: false});
            if (data && data.data && data.data.items) {
                console.log('取得操作员列表信息:', data.data.items);
                this.setState({dataSource: data.data.items});
                this.setState({total: data.data.page.total});
                this.setState({pagination: {total: data.data.page.total}});
                var summary = data.data.summary;
                this.setState({
                    statistic_info: {
                        pay_count: summary.pay_count,
                        pay_total: summary.pay_total,
                        refund_count: summary.refund_count,
                        refund_total: summary.refund_total
                    }
                });
            } else {
                console.log('取得操作员列表为空');
            }
        }.bind(this));
    }

    exportTransaction() {
        if (this.state.selectedStationList.length==0) {
            alert('选择油站不能为空哦，请重新选择~');
            return false;
        }
        // 取得操作员列表信息
        var stations = this.state.selectedStationList;
        var order_id = this.refs.orderID.value;
        var time_array = this.refs.time.state ? this.refs.time.state.value:'';
        var start_date = '';
        var end_date = '';
        if (time_array&&time_array[0]&&time_array[1]) {
            start_date = new Date(time_array[0].time).format();
            end_date = new Date(time_array[1].time).format();
        }
        var stationsReq = stations.map((item)=>('stations%5B%5D='+item+'&')).reduce((pre,cur)=>(pre+cur));
        var reqData = 'excel='+true+'&'+stationsReq+'order_id='+order_id+'&start_date='+start_date+'&end_date='+end_date;
        var url = 'http://'+window.location.host+'/'+oilConst.reqTransactionList+'?'+reqData;
        window.open(url);
    }
    render() {
        var four_stations = '';
        var stations = TransactionStore.stationList;
        var show_stations = stations;
        var more_stations = '';
        if (stations.length > 4) {
            show_stations = stations.slice(0, 4);
            more_stations = stations.slice(4, stations.length);
        }

        four_stations =
            (<ul className='fourStations'>
                <li>油站：</li>
                <li key='all'><label><input type='checkbox' name='checkAll' ref='selectAll'
                                            checked = {this.state.selectedStationList.length>0 && this.state.selectedStationList.length === this.state.stationList.length}
                                            onChange={this.selectAllHandler.bind(this)}/>全选</label></li>
                {
                    show_stations.map((item, idx)=>(
                        <li key={idx}><label><input type='checkbox'
                                                    checked={TransactionStore.selectedStationList&&TransactionStore.selectedStationList.indexOf(item.station_id)==-1?false:true}
                                                    onChange={this.selectSingle.bind(this,item.station_id)}
                                                    name='station' value={item.station_id}/>{item.name}</label></li>
                    ))
                }
            </ul>)

        return (
            <div id="pageTransaction">
                <section className='sec1-query'>
                    <div className='queryHeader'>交易查询</div>
                    <div className='queryContent'>
                        <table className='table-query' cellSpacing="0" cellPadding='0'>
                            <tbody>
                            <tr>
                                <td className="table-query-header">订单号：</td>
                                <td className="table-query-header">时间：</td>
                            </tr>
                            <tr>
                                <td><input type='text' className='orderIDInput' ref='orderID'></input>
                                </td>
                                <td><RangePicker style={{ width: 400,margin:'10px 0' }} showTime
                                                 format="yyyy/MM/dd HH:mm:ss" ref='time'/></td>
                                <td><Button type='primary' className="queryBtn"
                                            onClick={this.queryHandler.bind(this)}><Icon type="search"/>查询</Button></td>
                                <td><Button type="ghost" style={{margin:'10px 0'}} className='exportBtn' onClick={this.exportTransaction.bind(this)}>导出交易记录</Button></td>
                            </tr>
                            </tbody>
                        </table>
                        {four_stations}
                        {more_stations?<QueryMore moreStations = {more_stations} singleSelected={this.selectSingle}/>:''}
                        <div className='stationAmount'>选择油站数量：{this.state.selectedStationList.length}</div>
                    </div>
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
                                <div className='sec2-num'>{-this.state.statistic_info.refund_total}</div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
                <section className='sec3-table'>
                    <Table useFixedHeader rowKey={this.getRowKey.bind(this)} columns={this.columns} dataSource={this.state.dataSource} loading={this.state.loading}
                           pagination={this.state.pagination} onChange={this.handleTableChange.bind(this)}/>
                    <span className='total_records'>共 <i style={{color:"red"}}>{this.state.total}</i> 条记录</span>
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

        var stations =  this.state.stationList.map(item=>item.station_id);
        if(this.state.selectedStationList.length>0){
            stations = this.state.selectedStationList;
        }
        this.getTransactionList(pager.size, pager.current,stations);
    }
}

class QueryMore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMore: false,
            searchResult: undefined
        }
    }

    showMore() {
        this.setState({searchResult:undefined});
        this.setState({isShowMore: this.state.isShowMore ? false : true});
    }

    searchInput(moreStations) {
        const inputTxt = this.refs.searchInput.value.trim();
        const searchResult = moreStations.filter(item=> item.name.indexOf(inputTxt)!=-1);
        this.setState({searchResult:searchResult});
    }

    render() {
        const showStations = this.state.searchResult?this.state.searchResult:this.props.moreStations;
        const name = this.state.isShowMore?'bottom_none':'';
        return (
            <div className='moreStations'>
                <span className={'lookMore'+' '+name} onClick={this.showMore.bind(this)}>查看更多<i className='icon-look_up'></i></span>
                {
                    this.state.isShowMore ? (
                        <div className='moreStationsList'>
                            <input type='text' placeholder='请输入油站名称' className='inputSearch' ref='searchInput' onChange={this.searchInput.bind(this,this.props.moreStations)}/>
                            <Icon className='iconSearch' type="search"/>
                            <ul className='clearFix'>
                                {
                                    showStations.map((item,idx) =>
                                            <li key={idx}><label><input type='checkbox'

                                                                        checked={TransactionStore.selectedStationList&&TransactionStore.selectedStationList.indexOf(item.station_id)==-1?false:true}
                                                                        onChange={this.props.singleSelected.bind(this,item.station_id)}
                                                                        name='station' value={item.station_id}/>{item.name}</label></li>
                                    )
                                }
                            </ul>
                    </div>): ''
                }
            </div>
        )
    }
}

PageTransaction.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};

export default PageTransaction;