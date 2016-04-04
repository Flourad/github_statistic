/**
 * Created by danyu on 3/31/16.
 */
let Util = require('../common/Util');
let echarts = require('echarts/lib/echarts');
require('echarts/theme/shine');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/map/js/china');

class PageChinaMap extends React.Component {

    constructor(props) {
        super(props);
    }

    drawChinaMap(data,max,min) {
        let myChart = echarts.init(document.getElementById('chinaMap'),'shine');
        myChart.setOption({
            title: {    //标题组件
                show: true,
                text: 'China Users Distribution',
                left: 'center',
                textStyle: {
                    //color: 'red'
                }
            },
            series: [{  // 系列列表
                name: 'Github Data',
                type: 'map',    // 图标类型
                map: 'china',
                roam: true,
                label: {    //图形上的文本标签
                    normal: {
                        show: true  //是否在普通状态下显示标签
                    },
                    emphasis: {
                        show: true  //是否在高亮状态下显示标签
                    }
                },
                data: data
            }],
            tooltip: { // 提示框组件
                trigger: 'item' // 触发类型 --数据项类型触发，主要用于无轴图表
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
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
            type: 'post',
            url: 'chinamap',
            dataType: 'json',
            success: function(result) {
                console.log(result);
                if (result.status === 0) {
                    let data = result.locations.map((item)=>({name: Util.chinaCityMap[item.name], value: item.amount}));
                    let score = result.locations.map((item)=> item.amount);
                    let max = Math.max.apply(null, score);
                    let min = Math.min.apply(null, score);
                    console.log(data);
                    console.log('--------------------',max,min);
                    me.drawChinaMap(data,max,min);
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
           <div id='chinaMap' style={{width: '1200px',height:'600px'}}></div>
        )
    }
}

export default PageChinaMap;