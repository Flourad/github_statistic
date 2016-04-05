/**
 * Created by danyu on 4/4/16.
 */

let Util = require('../common/Util');
let echarts = require('echarts/lib/echarts');
require('echarts/theme/shine');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/map/js/china');
require('echarts/map/js/world');

class MapComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    drawMap(data,max,min,containerID) {
        let myChart = echarts.init(document.getElementById('mapContainer'),'shine');
        console.log('========',this.props.mapType);
        myChart.setOption({
            title: {    //标题组件
                show: true,
                text: this.props.mapConfig.titleText,
                left: 'center',
                top: this.props.mapConfig.titleTop || 'top',
                fontSize: '30',
                textStyle: {
                    //color: 'red'
                }
            },
            series: [{  // 系列列表
                //name: 'Github Data',
                type: 'map',    // 图标类型
                map: this.props.mapType,
                //roam: true,   // 是否支持缩放
                label: {    //图形上的文本标签
                    //normal: {
                    //    show: true  //是否在普通状态下显示标签
                    //},
                    emphasis: {
                        show: true  //是否在高亮状态下显示标签
                    }
                },
                data: data
            }],
            tooltip: { // 提示框组件
                trigger: 'item', // 触发类型 --数据项类型触发，主要用于无轴图表
                formatter: '{b}: {c}' // 提示框上文字格式
            },
            //toolbox: {
            //    show: true,
            //    orient: 'vertical',
            //    left: 'right',
            //    top: 'center',
            //    feature: {
            //        dataView: {readOnly: false},
            //        restore: {},
            //        saveAsImage: {}
            //    }
            //},
            visualMap: {    // 视觉映射
                min: min,
                max: max,
                realtime: false,
                calculable: true,
                text: ['高', '低'],
                color: ['orangered','yellow','lightskyblue']
            }
        });
        console.log(myChart);
    }

    componentDidMount() {
        let me = this;
        $.ajax({
            type: 'get',
            url: me.props.reqUrl,
            dataType: 'json',
            success: function(result) {
                console.log(result);
                if (result.status === 0) {
                    let nameMapping = me.props.mapType === 'china'?Util.chinaCityMap:Util.worldNameMap;
                    let data = result.locations.map((item)=>({name: nameMapping[item.name], value: item.amount}));
                    let UsersAmountArray = result.locations.map((item)=> item.amount);
                    let max = Math.max.apply(null, UsersAmountArray);
                    let min = Math.min.apply(null, UsersAmountArray);
                    console.log(data);
                    console.log('--------------------',max,min);
                    me.drawMap(data,max,min);
                } else {
                    alert('Error');
                }

            },
            error: function(e) {

            }
        })
    }

    render() {
        return(
            <div id='mapContainer' style={{width: '1200px',height:'600px'}}></div>
        )
    }
}

export default MapComponent;