/**
 * Created by danyu on 3/31/16.
 */

let Util = require('../common/Util');
let echarts = require('echarts/lib/echarts');
require('echarts/theme/shine');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/map/js/world');

class PageWorldMap extends React.Component {
    constructor(props) {
        super(props);
    }

    drawWorldMap(data,max,min) {
        let myChart = echarts.init(document.getElementById('worldMap'),'shine');
        console.log(myChart);
        let option = {
            title: {
                text: 'World Users Distribution',
                subtext: '',
                sublink: '',
                left: 'center',
                top: 'top'
            },
            tooltip: {
                trigger: 'item'
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
            visualMap: {
                min: min,
                max: max,
                text:['High','Low'],
                realtime: false,
                calculable: true,
                color: ['orangered','yellow','lightskyblue']
            },
            series: [
                {
                    name: 'Github Data',
                    type: 'map',
                    mapType: 'world',
                    roam: true,
                    itemStyle:{
                        emphasis:{label:{show:true}}
                    },
                    data: data
                }
            ]
        };

        myChart.setOption(option);
    }

    componentDidMount() {
        var thiz = this;
        $.ajax({
            type: 'post',
            url: 'worldmap',
            dataType: 'json',
            success: function(result) {
                console.log(result);
                if (result.status === 0) {
                    let data = result.locations.map((item)=>({name: Util.worldNameMap[item.name], value: item.amount}));
                    let amountArr = result.locations.map((item)=> item.amount);
                    let max = Math.max.apply(null, amountArr);
                    let min = Math.min.apply(null, amountArr);
                    console.log('--------------------',max,min);
                    thiz.drawWorldMap(data,max,min);
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
            <div id='worldMap' style={{width: '1200px',height:'600px'}}></div>
        )
    }
}

export default PageWorldMap;