/**
 * @file 新增/修改 权限
 * Created by jinjiaxing on 16/3/9.
 */
import CommonData from '../common/CommonData';
import LoginStore from '../stores/GlobalStore';
import LoginAction from '../actions/GlobalAction';
import Query from '../Query.js';

let { Button, Icon, DatePicker, Table, Select} =AntD;
let { RangePicker } = DatePicker;
const Option = Select.Option;

var ExtendAction = Reflux.createActions([
    'updateStationList'
]);
var ExtendStore = Reflux.createStore({
    stationList: [],
    listenables: [ExtendAction],
    onUpdateStationList: function (stationList) {
        this.stationList = stationList;
        this.trigger(stationList);
    }
});

class PageExtend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: undefined,
            total: 0,
            pagination: {
                current: 1,
                size: 10
            },
            stationId: '',
            stations: ExtendStore.stationList,
            stationName: '',
            defaultSelect: '',
            loading: false
        };

        ExtendStore.listen(this.updateSelect.bind(this));

        var loginData= LoginStore.loginData.data.stations;

        if ( loginData ) {
            if( loginData.length > 0 ){
                ExtendStore.stationList = LoginStore.loginData.data.stations;
                ExtendAction.updateStationList(LoginStore.loginData.data.stations);
                //this.setState({defaultSelect:ExtendStore.stationList[0].name});
                this.state.stations = LoginStore.loginData.data.stations;
                console.debug('已经存在 stations=', this.state.stations);
            }else{
                LoginAction.updateLoginState();
                LoginStore.listen(this.onUpdateLoginState.bind(this));
            }

        } else {
            LoginAction.updateLoginState();
            LoginStore.listen(this.onUpdateLoginState.bind(this));
        }



        this.columns = [
            {
                title: '序号777',
                dataIndex: 'num',
                key: 'num',
                render(text, record, index){
                    return(
                        <span>{index + 1}</span>
                    )
                }
            },{
                title: '活动推送时间',
                dataIndex: 'time',
                key: 'time',
                render(text, record, index){
                    var d = new Date( text * 1000);
                    return (
                        <span>{d.format()}</span>
                    )
                }
            },{
                title: '成功推送用户数',
                dataIndex: 'push_count',
                key: 'push_count'
            },{
                title: '推送浏览用户数',
                dataIndex: 'click_count',
                key: 'click_count'
            },{
                title: '油券领取数',
                dataIndex: 'coupon_get',
                key: 'coupon_get'
            },{
                title: '油券已使用数',
                dataIndex: 'coupon_use',
                key: 'coupon_use'
            },{
                title: '油券金额',
                dataIndex: 'hongbao_price',
                key: 'hongbao_price'
            },{
                title: '油券有效期',
                dataIndex: 'hongbao_deadline',
                key: 'hongbao_deadline',
                render(text, record, index) {
                    var d = new Date( text * 1000);
                    return (
                        <span>{d.format()}</span>
                    )
                }
            }];


    }

    updateSelect(stationList){
        this.setState({stations: stationList});
    }

    /**
     * 获取用户信息油站列表
     *
     * @param data 用户信息数据
     */
    onUpdateLoginState(data) {
        console.debug('重新获取的', data.data.stations);
        //this.setState({stations: data.data.stations});
        ExtendStore.stationList = data.data.stations;
        ExtendAction.updateStationList(data.data.stations);
        this.setState({defaultSelect:ExtendStore.stationList[0].name});

        this.getExtendList(10,1,data.data.stations[0].station_id);
    }

    /**
     * 取得扩展列表信息
     *
     */
    getExtendList(size,page,station) {
        var time_array = this.refs.time.state ? this.refs.time.state.value:'';
        var starttime = '';
        var endtime = '';
        if (time_array&&time_array[0]&&time_array[1]) {
            starttime = new Date(time_array[0].time).format();
            endtime = new Date(time_array[1].time).format();
        }
        var reqData={
            size:size,
            page:page,
            station_id: station,
            starttime: starttime,
            endtime: endtime
        };
        this.setState({loading: true});
        Query.get(oilConst.reqExtendList, reqData, function (data) {
            this.setState({loading: false});
            if (data&&data.data&&data.data.items) {
                console.log('取得扩展信息:', data.data.items);
                this.setState({dataSource: data.data.items});
                this.setState({total: data.data.page.total});
                this.setState({pagination:{total:data.data.page.total}});
            } else {
                console.log('取得扩展列表为空');
            }

        }.bind(this));
    }

    componentDidMount() {
        if(this.state.stations.length){
            this.getExtendList(10,1,this.state.stations[0].station_id);
            this.setState({defaultSelect:ExtendStore.stationList[0].name});

        }

    }

    /**
     * 查询
     */
   toQuery(){
        const pager = this.state.pagination;
        pager.current = 1;
        pager.size = 10;

        this.setState({
            pagination: pager
        });
        this.getExtendList(pager.size, pager.current , this.state.stationId);
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

    /**
     * 选择油站时触发
     *
     * @param value id值
     * @param label 显示文字
     */
    stationChange(value, label) {
        this.setState({stationId: value});
        this.setState({defaultSelect: label});

    }

    render() {
        let optionArray = [];
        if (this.state.stations && this.state.stations.length > 0 ) {
            let stationInfo = this.state.stations;
            for (let i = 0; i < stationInfo.length; i++) {
                let optionDom = (<Option key={stationInfo[i].station_id}
                                         value={stationInfo[i].station_id}>{stationInfo[i].name}</Option>);
                optionArray.push(optionDom);
            }
        } else {
            console.debug('尚未取到油站列表');
        }
        return (
            <div id='pageExtend'>
                <div className='queryHeader'>推广效果分析</div>
                <section className="attendanceSelect">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <label>油站 :</label>
                            </td>
                            <td>
                                <label>时间 :</label>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <Select ref='selStation' value={this.state.defaultSelect} style={{ width: 316 }}
                                        onChange={this.stationChange.bind(this)}>
                                    {optionArray}
                                </Select>
                            </td>
                            <td>
                                <RangePicker style={{ width: 400,margin:'10px 10px 10px 0' }} showTime
                                             format="yyyy/MM/dd HH:mm:ss" ref='time'/>
                            </td>
                            <td>
                                <Button type='primary'  onClick={this.toQuery.bind(this)} className="queryBtn"><Icon type="search"/>查询</Button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
                <section className="data-table">
                    <Table useFixedHeader rowKey={this.getRowKey.bind(this)} columns={this.columns} dataSource={this.state.dataSource}
                           loading={this.state.loading}  pagination={this.state.pagination} onChange={this.handleTableChange.bind(this)}/>
                    <label className="dataTotal">共 <i style={{color:"red"}}>{this.state.total}</i> 条记录</label>
                </section>
            </div>

        );
    }

    handleTableChange(pagination) {
        let station = this.state.stationId;
        const pager = this.state.pagination;
        pager.current = pagination.current;
        pager.size = 10;

        this.setState({
            pagination: pager
        });

        this.getExtendList(pager.size, pager.current,station);
    }
}

PageExtend.defaultProps = {};
PageExtend.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};

export default PageExtend;