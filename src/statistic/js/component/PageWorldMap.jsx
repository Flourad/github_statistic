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
                text: 'Github Data',
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
            url: 'worldmapajax',
            dataType: 'json',
            success: function(result) {
                console.log(result);
                let data = [];
                let score = [];
                for (var key in result) {
                    data.push({name: Util.worldNameMap[key], value: result[key].score});
                    score.push(result[key].score);
                }
                var max = Math.max.apply(null, score);
                var min = Math.min.apply(null, score);
                console.log('--------------------',max,min);
                thiz.drawWorldMap(data,max,min);
            },
            error: function(e) {

            }
        })

    }


    render() {
        return(
            <div id='worldMap' style={{width: '1000px',height:'400px'}}></div>
        )
    }
}

export default PageWorldMap;