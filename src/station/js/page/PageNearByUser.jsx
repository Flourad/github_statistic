/**
 * Created by jinjiaxing on 16/3/17.
 */

/**
 * @file 新增/修改 权限
 * Created by jinjiaxing on 16/3/17.
 */

import CommonData from '../common/CommonData';
import LoginStore from '../stores/GlobalStore';
import LoginAction from '../actions/GlobalAction';
import Query from '../Query.js';

import MapMask from '../common/MapMask';

let map;
let searchBoxObj = null;
let chart;
let label;
let hotMask;
let communityMask;
let circleOverlay;
let centerlay;
let community = {
    data: null,
    filter: null,
    shadowBox: null,
    comingRank: null,
    presentRank: null,
    max: 0,
    min: 0,
    tips: $('.community-tips')
};

let hot = {
    data: {},
    max: 0,
    min: 0
};

let fillColors = [
    [73, 174, 34],
    [119, 191, 26],
    [160, 205, 18],
    [202, 221, 10],
    [248, 237, 1],
    [225, 222, 3],
    [254, 182, 10],
    [254, 126, 19],
    [254, 84, 27],
    [253, 54, 32]
];

class PageNearByUser extends React.Component {
    constructor(props) {
        super(props);

        window.GLOBAL_DATA = {
            "API_URL_dev": "http:\/\/cp01-rdqa-dev361.cp01.baidu.com:8080",
            "API_URL": "http:\/\/huiyan.baidu.com",
            "ECHARTS_THEMES": {"color": ["#4DB8EC", "#4CD2EF", "#1581FF", "#496BB5", "#FF524E", "#FF8381", "#FEAB81", "#FE964D", "#FD4F84", "#DB3164", "#A0C152", "#C4EA62", "#42940C", "#78C63E", "#DBD7D8", "#BDBDBD", "#999", "#555", "#333"]}
        };

        this.state = {
            COOPER_LOC: {
                center: [116.9808953895, 36.726670794696],
                name: '壳牌测试油站'
            }
        };

    }

    componentDidMount() {
        chart = window.echarts.init(document.getElementById('communityChart'));
        window.onresize = chart.resize;
        this.initMap();

        this.initPlugs();

        this.commingCommunityInit();

    }

    initMap() {
        map = new BMap.Map('comming-map'); // 创建Map实例

        this.setMapStyle(map);

        var centerX = this.state.COOPER_LOC.center[0];
        var centerY = this.state.COOPER_LOC.center[1];

        map.centerAndZoom(new BMap.Point(centerX, centerY), 15); // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_LEFT
        }));
        map.addControl(new window.BMap.NavigationControl());
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

        // add community mask
        communityMask = new MapMask({
            map: map
        });
        var me = this;
        communityMask.addEventListener('draw', function (obj) {
            if (!community.data) {
                return false;
            }
            console.log('%%%%%%%=', obj);
            var zoom = map.getZoom();
            var zoomUnit = this.zoomUnit = Math.pow(2, 18 - zoom);
            var mapCenter = map.getCenter();
            var canvasCtx = this.canvasCtx = this.element.getContext('2d');
            canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
            this.shadow.getContext('2d').clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
            var mapCenterMercator = this.mercatorProjection.lngLatToPoint(mapCenter);
            this.mapLeftTopMercator = {
                x: mapCenterMercator.x - (canvasCtx.canvas.width / 4) * zoomUnit,
                y: mapCenterMercator.y + (canvasCtx.canvas.height / 4) * zoomUnit
            };

            // draw the area
            me.drawCitys.call(this);
        });

        // add hot mask
        hotMask = new MapMask({
            map: map
        });
        hotMask.addEventListener('draw', function (obj) {
            var zoom = map.getZoom();
            var zoomUnit = this.zoomUnit = Math.pow(2, 18 - zoom);
            var mapCenter = map.getCenter();
            var canvasCtx = this.canvasCtx = this.element.getContext('2d');
            canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
            var mapCenterMercator = this.mercatorProjection.lngLatToPoint(mapCenter);
            this.mapLeftTopMercator = {
                x: mapCenterMercator.x - (canvasCtx.canvas.width / 4) * zoomUnit,
                y: mapCenterMercator.y + (canvasCtx.canvas.height / 4) * zoomUnit
            };
            drawHot.call(this);
        }.bind(this));
    }

    setMapStyle() {
        /******/
        map.getContainer().style.background = '#081734';

        // 地图自定义样式
        map.setMapStyle({
            styleJson: [{
                featureType: 'water',
                elementType: 'all',
                stylers: {
                    color: '#044161'
                }
            }, {
                featureType: 'land',
                elementType: 'all',
                stylers: {
                    color: '#091934'
                }
            }, {
                featureType: 'boundary',
                elementType: 'geometry',
                stylers: {
                    color: '#064f85'
                }
            }, {
                featureType: 'railway',
                elementType: 'all',
                stylers: {
                    visibility: 'off'
                }
            }, {
                featureType: 'highway',
                elementType: 'geometry',
                stylers: {
                    color: '#004981'
                }
            }, {
                featureType: 'highway',
                elementType: 'geometry.fill',
                stylers: {
                    color: '#005b96',
                    lightness: 1
                }
            }, {
                featureType: 'highway',
                elementType: 'labels',
                stylers: {
                    visibility: 'on'
                }
            }, {
                featureType: 'arterial',
                elementType: 'geometry',
                stylers: {
                    color: '#004981',
                    lightness: -39
                }
            }, {
                featureType: 'arterial',
                elementType: 'geometry.fill',
                stylers: {
                    color: '#00508b'
                }
            }, {
                featureType: 'poi',
                elementType: 'all',
                stylers: {
                    visibility: 'off'
                }
            }, {
                featureType: 'green',
                elementType: 'all',
                stylers: {
                    color: '#056197',
                    visibility: 'off'
                }
            }, {
                featureType: 'subway',
                elementType: 'all',
                stylers: {
                    visibility: 'off'
                }
            }, {
                featureType: 'manmade',
                elementType: 'all',
                stylers: {
                    visibility: 'off'
                }
            }, {
                featureType: 'local',
                elementType: 'all',
                stylers: {
                    visibility: 'off'
                }
            }, {
                featureType: 'arterial',
                elementType: 'labels',
                stylers: {
                    visibility: 'off'
                }
            }, {
                featureType: 'boundary',
                elementType: 'geometry.fill',
                stylers: {
                    color: '#029fd4'
                }
            }, {
                featureType: 'building',
                elementType: 'all',
                stylers: {
                    color: '#1a5787'
                }
            }, {
                featureType: 'label',
                elementType: 'all',
                stylers: {
                    visibility: 'off'
                }
            }, {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: {
                    color: '#ffffff'
                }
            }, {
                featureType: 'poi',
                elementType: 'labels.text.stroke',
                stylers: {
                    color: '#1e1c1c'
                }
            }]
        });
    }

    drawCitys() {

        var shadowctx = this.shadow.getContext('2d');
        var shadowR = 0;
        var shadowG = 0;
        var shadowB = 0;
        this.colorIndex = {};

        var datas = community.filter.data;

        if (!datas) {
            return false;
        }

        var step = (community.max - community.min + 1) / 10;

        for (var i = 0; i < datas.length; i++) {
            if (!datas[i].bound) {
                continue;
            }
            var bounds = datas[i].bound.split(',');

            var level = Math.floor((parseInt(datas[i].num, 10) - community.min) / step);

            if (bounds.length >= 2) {
                this.canvasCtx.beginPath();
                var moveToX = (bounds[0] - this.mapLeftTopMercator.x) / this.zoomUnit;
                var moveToY = -(bounds[1] - this.mapLeftTopMercator.y) / this.zoomUnit;
                this.canvasCtx.moveTo(moveToX, moveToY);
                shadowctx.beginPath();
                shadowctx.moveTo(moveToX, moveToY);
            }

            for (var j = 2; j < bounds.length; j += 2) {
                var lineToXA = (bounds[j] - this.mapLeftTopMercator.x);
                var lineToX = lineToXA / this.zoomUnit;
                var lineToYA = (bounds[j + 1] - this.mapLeftTopMercator.y);
                var lineToY = -lineToYA / this.zoomUnit;
                this.canvasCtx.lineTo(lineToX, lineToY);
                shadowctx.lineTo(lineToX, lineToY);
            }
            var cR = fillColors[level][0];
            var cG = fillColors[level][1];
            var cB = fillColors[level][2];
            this.canvasCtx.fillStyle = 'rgba(' + cR + ',' + cG + ',' + cB + ',0.6)';
            this.canvasCtx.fill();

            shadowB++;
            if (shadowB > 255) {
                shadowB = 0;
                shadowG++;
            }
            if (shadowG > 255) {
                shadowG = 0;
                shadowR++;
            }
            this.colorIndex[shadowR * 255 * 255 + shadowG * 255 + shadowB] = i;
            shadowctx.fillStyle = 'rgba(' + shadowR + ',' + shadowG + ',' + shadowB + ',1)';
            shadowctx.fill();
        }

        this.communityHover = function (index, e) {
            if (!datas[index]) {
                return false;
            }
            var left = e.pageX + 10;
            if (left < document.body.clientWidth - 180) {
                community.tips.css({
                    left: left - $('.coming-box').offset().left,
                    right: 'auto',
                    top: e.pageY + 10 - $('.coming-box').offset().top
                });
            } else {
                community.tips.css({
                    left: 'auto',
                    right: document.body.clientWidth - left,
                    top: e.pageY + 10 - $('.coming-box').offset().top
                });
            }

            community.tips
                .html(datas[index].community + '<br>来源人数：' + datas[index].num + '<br>小区人数：' + datas[index].total)
                .show();
        };
        this.communityMouseout = function () {
            community.tips.hide();
        };
    }

    drawHot() {
        var self = this;
        var canvasCtx = self.canvasCtx;

        // console.log(this.mapLeftTopMercator, this.zoomUnit, hot);
        var levelStep = (hot.max - hot.min + 1) / 10;
        showGuid(hot.max, hot.min);

        levelStep = 0.5;

        for (var i in hot.data) {
            var temp = i.split('|');
            var val = hot.data[i] - hot.min;
            var level = Math.floor(val / levelStep);
            level = level > (fillColors.length - 1) ? (fillColors.length - 1) : level;
            // console.log(level)
            var x = (temp[0] - this.mapLeftTopMercator.x) / this.zoomUnit;
            var y = (this.mapLeftTopMercator.y - temp[1]) / this.zoomUnit;

            var cR = fillColors[level][0];
            var cG = fillColors[level][1];
            var cB = fillColors[level][2];
            canvasCtx.fillStyle = 'rgba(' + cR + ',' + cG + ',' + cB + ',0.6)';
            canvasCtx.fillRect(x, y, 90 / this.zoomUnit, 90 / this.zoomUnit);
        }
    }

    getHotDate(start, callback) {
        $.ajax({
            url: 'admin/huiyan/community',
            dataType: 'json',
            data: {'date': '2016-01-08', station_id: '224'},
            success: function (data) {
                callback&&callback(data);
            }
        });
    }

    commingCommunityInit() {
        chart.clear();
        $('.coming-handle a').removeClass('active');
        $('.coming-handle a').eq(0).addClass('active');

        community.tips&&community.tips.hide();
        $('.comming-filter').css({
            right: '20px'
        });
        $('.community-cricle').css({
            right: '-320px'
        });
        map.removeOverlay(circleOverlay);
        map.removeOverlay(label);
        map.removeOverlay(centerlay);

        var me = this;
        this.getCommunityData('2016-01-08', function (data) {
            console.info('----getCommunityData----getCommunityData');
            if (data.data.length <= 0) {
                communityMask.hide();
                hotMask.hide();
                $('.community-chart-change button').eq(1).hide();
                return false;
            }

            // is no present
            var canPresent = false;
            for (var i in data.data) {
                if (data.data[i].num&&parseInt(data.data[i].total, 10) > 0) {
                    canPresent = true;
                    break;
                }
            }
            if (!canPresent) {
                $('.community-chart-change button').eq(1).hide();
            } else {
                $('.community-chart-change button').eq(1).show();
            }

            community.data = data;
            var max;
            // var min;
            for (var i in data.data) {
                if (!data.data[i].num) {
                    continue;
                }
                data.data[i].num = parseInt(data.data[i].num, 10);
                max = max||data.data[i].num;
                max = max > data.data[i].num ? max : data.data[i].num;
            }
            searchBoxObj.changeRange(0, max);
            me.communityDataInit();
            communityMask.show();
            hotMask.hide();
            me.showComunity();
        });

        // marked the center
        if (this.state.COOPER_LOC.center) {
            var point = new window.BMap.Point(this.state.COOPER_LOC.center[0], this.state.COOPER_LOC.center[1]);
            centerlay = new window.BMap.Marker(point); // 创建标注

            var infoWindow = new window.BMap.InfoWindow(this.state.COOPER_LOC.name); // 创建信息窗口对象
            centerlay.addEventListener('click', function () {
                map.openInfoWindow(infoWindow, point); // 开启信息窗口
            });
            map.addOverlay(centerlay);
            map.centerAndZoom(point, 15);
        }
    }

    commingHotInit() {
        community.tips&&community.tips.hide();
        $('.comming-filter').css({
            right: '-320px'
        });
        $('.community-cricle').show().css({
            right: '20px'
        });

        this.getHotDate('2016-01-08', function (data) {
            var datas;
            hot.data = datas = {};
            $('.community-cricle').html('');
            try {
                hot.redis = JSON.parse(data.data.redis);
                var html = '';
                for (var i in hot.redis) {
                    html += '<a href="#" data-value="' + i + '">' + i + 'm</a>';
                }
                $('.community-cricle').html(html);
            } catch (e) {
                // console.log(e)
            }

            hot.max = hot.min = null;
            console.debug('data=', data);
            for (var i = 0; i < data.data.hot.length; i++) {
                var info = data.data.hot[i].split('\t');
                var pos = info[0];
                var val = parseInt(info[1], 10);

                var posA = pos.split('|');
                if (posA[1]) {
                    var name = parseInt(posA[0] / 100, 10) * 100 + '|' + parseInt(posA[1] / 100, 10) * 100;
                    datas[name] = datas[name]||0;
                    datas[name] += val;

                    hot.max = hot.max||datas[name];
                    hot.min = hot.min||datas[name];

                    hot.max = hot.max >= datas[name] ? hot.max : datas[name];
                    hot.min = hot.min <= datas[name] ? hot.min : datas[name];
                }
            }

            communityMask.hide();
            hotMask.show();

        });
    }

    drayCricle() {
        $('.community-cricle').on('click', 'a', function () {
            var radius = $(this).attr('data-value');

            map.removeOverlay(circleOverlay);
            map.removeOverlay(label);
            $('.community-cricle a').removeClass('active');
            if (cricleVal === radius) {
                cricleVal = 0;
            } else {
                cricleVal = radius;
                $(this).addClass('active');

                var point = new window.BMap.Point(window.COOPER_LOC.center[0], window.COOPER_LOC.center[1]);
                circleOverlay = new window.BMap.Circle(point, radius);

                map.addOverlay(circleOverlay);

                var zoom = map.getZoom();
                var zoomUnit = Math.pow(2, 18 - zoom);
                // add text
                var opts = {
                    position: point, // 指定文本标注所在的地理位置
                    // offset: new BMap.Size(radius / zoomUnit, -radius / zoomUnit), //设置文本偏移量
                    zIndex: 1000
                };

                var customerNum;
                var customerCou;
                if (!hot.redis|| !hot.redis[radius]) {
                    customerNum = customerCou = '--';
                } else {
                    // console.log(hot.redis[radius])
                    customerNum = hot.redis[radius][0];
                    customerCou = hot.redis[radius][1];
                }
                var labeHtml = '半径：' + radius + '米<br>顾客人数：' + customerNum;
                labeHtml += '<br>所占比例：' + customerCou + '%';
                label = new window.BMap.Label(labeHtml, opts); // 创建文本标注对象
                label.setZIndex(10000);
                label.setStyle({
                    color: '#FFF',
                    background: 'rgba(0,0,0,0.4)',
                    border: 'none',
                    padding: '10px'
                });
                map.addOverlay(label);
                // console.log(hot)

            }

            return false;
        });
    }

    changeType() {
        $('.coming-handle a').on('click', function () {
            var index = $(this).index('.coming-handle a');
            $('.coming-handle a,.community-cricle a').removeClass('active');
            $(this).addClass('active');
            if (index === 0) {
                this.commingCommunityInit();
            } else {
                this.commingHotInit();
            }
            return false;
        }.bind(this));
    }

    initPlugs() {
        // init search box
        window.s = searchBoxObj = new SearchBox(0, 4000);

        var me = this;
        // bind change echart's type event
        $('.community-chart-change button').on('click', function () {
            $('.community-chart-box').addClass('active');
            $('.community-chart-change button').removeClass('active');
            $(this).addClass('active');

            var index = $(this).index('.community-chart-change button');
            if (index === 0) {
                me.showComunity();
            } else if (index === 1) {
                me.showComunityPresent();
            }
        });

        // bind open and close echart's button
        $('.comming-chart-handle').on('click', function () {
            var isActive = $('.community-chart-box').hasClass('active');
            if (isActive) {
                $('.community-chart-box').removeClass('active');
            } else {
                $('.community-chart-box').addClass('active');
            }
        });

        // init draw crcile
        this.drayCricle();

        // init change community or hot map
        this.changeType();

        // bind back to the center
        $('.community-location').on('click', function () {
            var point = new window.BMap.Point(window.COOPER_LOC.center[0], window.COOPER_LOC.center[1]);
            map.centerAndZoom(point, 15);
        });

        // bind full screen
        var runPrefixMethod = function (element, method) {
            var usablePrefixMethod;
            ['webkit', 'moz', 'ms', 'o', ''].forEach(function (prefix) {
                if (usablePrefixMethod) {
                    return;
                }
                if (prefix === '') {
                    // 无前缀，方法首字母小写
                    method = method.slice(0, 1).toLowerCase() + method.slice(1);
                }

                var typePrefixMethod = typeof element[prefix + method];

                if (typePrefixMethod + '' !== 'undefined') {
                    if (typePrefixMethod === 'function') {
                        usablePrefixMethod = element[prefix + method]();
                    } else {
                        usablePrefixMethod = element[prefix + method];
                    }
                }
            });

            return usablePrefixMethod;
        };

        $('.community-fullscreen').on('click', function () {
            runPrefixMethod($('.coming-box')[0], 'RequestFullScreen');
            setTimeout(function () {
                var point = new window.BMap.Point(window.COOPER_LOC.center[0], window.COOPER_LOC.center[1]);
                map.centerAndZoom(point, 15);
            }, 500);
        });
    }

    showComunity() {
        chart.clear();

        var names = [];
        var values = [];

        for (var i = 0; i < community.comingRank.length; i++) {
            var cmu = community.comingRank[i];
            names.push(cmu.community);
            values.push(parseInt(cmu.num, 10));
        }

        var option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                x: 50,
                x2: 30,
                y1: 35,
                y2: 80
            },
            xAxis: [{
                type: 'category',
                data: names,
                axisLabel: {
                    rotate: 30
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(0,0,0,0.05)',
                        width: 1,
                        type: 'solid'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#ccc',
                        width: 1,
                        type: 'solid'
                    }
                },
                splitArea: {
                    show: true,
                    color: [
                        'rgba(250,250,250,0.05)',
                        'rgba(200,200,200,0.05)'
                    ]
                }
            }],
            series: [{
                name: '来源人数',
                type: 'bar',
                data: values,
                itemStyle: {
                    normal: {
                        color: '#199ED8'
                    }
                }
            }]
        };

        chart.setOption(option);
    }

    showComunityPresent() {
        var names = [];
        var values = [];
        chart.clear();
        for (var i = 0; i < community.presentRank.length; i++) {
            var cmu = community.presentRank[i];
            names.push(cmu.community);
            values.push((100 * cmu.num / cmu.total).toFixed(2));

        }

        var option = {
            tooltip: {
                trigger: 'axis',
                formatter: function () {
                    var index = arguments[1].split(':')[1];
                    var info = community.presentRank[index];
                    var html = info.community + '<br>来源人数：' + info.num;
                    html += '<br>总人数：' + info.total;
                    html += '<br>渗透率：' + (info.present * 100).toFixed(2) + '%';
                    return html;
                }
            },
            grid: {
                x: 50,
                x2: 30,
                y1: 35,
                y2: 80
            },
            xAxis: [{
                type: 'category',
                data: names,
                axisLabel: {
                    rotate: 30
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(0,0,0,0.05)',
                        width: 1,
                        type: 'solid'
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#ccc',
                        width: 1,
                        type: 'solid'
                    }
                },
                splitArea: {
                    show: true,
                    color: [
                        'rgba(250,250,250,0.05)',
                        'rgba(200,200,200,0.05)'
                    ]
                }
            }],
            series: [{
                name: '来源人数',
                type: 'bar',
                data: values,
                itemStyle: {
                    normal: {
                        color: '#199ED8'
                    }
                }
            }]
        };

        chart.setOption(option);
    }

    getCommunityData(start, callback) {
        $.ajax({
            url: 'admin/huiyan/community',
            dataType: 'json',
            data: {'date': '2016-01-08', station_id: '224'},
            success: function (data) {
                callback&&callback(data);
            }
        });
    }

    //getHotDate(start, end, callback) {
    //        $.ajax({
    //            url: '/huiyan/api/customer?type=hot&date=' + start + '&date_end=' + end,
    //            dataType: 'jsonp',
    //            success: function (data) {
    //                callback && callback(data);
    //            }
    //        });
    //
    //}

    communityDataInit(key, start, end) {
        // console.log('communityDataInit');
        var datas = community.data.data;
        community.filter = {
            data: []
        };

        community.min = null;
        community.max = null;
        for (var i = 0; i < datas.length; i++) {
            // filter the data
            if (!datas[i].num|| !datas[i].total) {
                continue;
            }
            // console.log('#####', datas[i].num, datas[i].total)
            datas[i].present = parseInt(datas[i].num, 10) / parseInt(datas[i].total, 10);
            if (key) {
                if (datas[i].community.indexOf(key) === -1) {
                    continue;
                }
            }
            if (start !== undefined&&end !== undefined) {

                if (parseInt(datas[i].num, 10) < start||parseInt(datas[i].num, 10) > end) {
                    continue;
                }
            }
            //
            community.filter.data.push(datas[i]);
            var num = parseInt(datas[i].num, 10);
            community.min = community.min||num;
            community.max = community.max||num;
            community.min = community.min < num ? community.min : num;
            community.max = community.max > num ? community.max : num;
        }

        datas.sort(function (a, b) {
            return parseInt(b.num, 10) - parseInt(a.num, 10);
        });

        var comingRank = [];

        for (var i = 0; i < 20; i++) {
            datas[i]&&comingRank.push(datas[i]);
        }

        datas.sort(function (a, b) {
            return parseInt(b.num, 10) / parseInt(b.total, 10) - parseInt(a.num, 10) / parseInt(a.total, 10);
        });
        var presentRank = [];

        var rankCount = 0;
        var totalCount = 0;
        var index = 0;

        while (index < datas.length&&rankCount < 20) {

            if (datas[index].bound&&datas[index].total&&datas[index].present&&datas[index].present < 10) {
                presentRank.push(datas[index]);
                rankCount++;
            }
            index++;
        }

        community.comingRank = comingRank;
        community.presentRank = presentRank;

        this.showGuid(community.max, community.min);

    }

    showGuid(maxVal, minVal) {
        var box = $('.coming-guit-color');
        box.html(' ');
        var min = $('.coming-guit-min');
        min.html(maxVal);
        var max = $('.coming-guit-max');
        max.html(minVal);
        // console.log(fillColors);
        var index = fillColors.length;
        while (--index >= 0) {
            var cR = fillColors[index][0];
            var cG = fillColors[index][1];
            var cB = fillColors[index][2];
            box.append('<span style="background:rgba(' + cR + ',' + cG + ',' + cB + ',0.8)"></span>');
        }
    }

    render() {

        return (
            <div id='pageNearByUser'>
                <div className="chartArea" style={{width:'100%',height:'720px'}}>
                    <div className="coming">
                        <dl className="itemBox">
                            <dt>来源小区</dt>
                            <dd className="clearfix coming-box">
                                <div className="community-tips"></div>
                                <div className="coming-handle">
                                    <a href="#" className="active">小区</a>
                                </div>
                                <div className="coming-guit">
                                    <div className="coming-guit-color">
                                    </div>
                                    <div className="coming-guit-num">
                                        <span className="coming-guit-min"></span>
                                        <span className="coming-guit-max"></span>
                                    </div>
                                </div>
                                <div className="comming-filter">
                                    <div className="comming-filter-title">精确查询</div>
                                    <div className="comming-filter-key">
                                        <input type="text" placeholder="请输入关键字"></input>
                                    </div>
                                    <div className="comming-filter-range">
                                        <div>来源人数范围：<span>--</span>-<span>--</span></div>
                                        <div className="comming-filter-bar">
                                            <div className="comming-filter-bar-handle">
                                                <div className="comming-filter-bar-handle-in"></div>
                                            </div>
                                            <div className="comming-filter-bar-handle">
                                                <div className="comming-filter-bar-handle-in"></div>
                                            </div>
                                            &nbsp;
                                            <div className="comming-filter-bar-bg"></div>
                                            <div className="comming-filter-bar-tips">
                                                <span>--</span>
                                                <span className="comming-filter-bar-right">--</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comming-filter-bar-button">
                                        <button>查找</button>
                                    </div>
                                </div>
                                <div className="community-chart-box">
                                    <span className="comming-chart-handle"></span>
                                    <div className="community-chart-change">
                                        <button className="active">来源人数</button>
                                        <button>渗透率</button>
                                    </div>
                                    <div className="community-chart" id="communityChart"></div>
                                </div>
                                <div className="community-cricle">
                                    <a href="#" data-value="500">500m</a>
                                    <a href="#" data-value="1000">1000m</a>
                                    <a href="#" data-value="2000">2000m</a>
                                    <a href="#" data-value="5000">5000m</a>
                                    <a href="#" data-value="10000">10000m</a>
                                </div>
                                <div className="coming-map" id="comming-map">
                                </div>
                                <div className="community-location" title="来源人数">
                                    <div className="community-location-cricle">
                                        <div className="community-location-x"></div>
                                        <div className="community-location-y"></div>
                                        <div className="community-location-in"></div>
                                    </div>
                                </div>
                                <div className="community-fullscreen" title="小区">
                                    <div className="community-fullscreen-in">
                                        <div className="community-fullscreen-crosslinex"></div>
                                        <div className="community-fullscreen-crossliney"></div>
                                    </div>
                                    <div className="community-fullscreen-crossx"></div>
                                    <div className="community-fullscreen-crossy"></div>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

        );
    }
}

PageNearByUser.contextTypes = {
    router: function () {
        return React.PropTypes.func.isRequired;
    }
};

function SearchBox(start, end, callback) {
    var self = this;
    this.end = end;
    this.start = start;
    this.maxVal = $('.comming-filter-bar-bg').width();

    this.max = this.maxVal;
    this.min = 0;
    this.startVal = $('.comming-filter-range span').eq(0);
    this.startVal.html(this.start);
    this.endVal = $('.comming-filter-range span').eq(1);
    this.endVal.html(this.end);
    this.startHandle = $('.comming-filter-bar-handle').eq(0);
    this.endHandle = $('.comming-filter-bar-handle').eq(1);

    this.init();

    var canmove = false;

    var startx;
    var starty;
    var startleft;
    var target;
    var type;
    this.startHandle.on('mousedown', function (e) {
        target = $(this);
        startx = e.pageX;
        starty = e.pageY;
        startleft = parseInt(target.css('left'), 10)||0;
        type = 'left';
        canmove = true;
    });
    this.endHandle.on('mousedown', function (e) {
        target = $(this);
        startx = e.pageX;
        starty = e.pageY;
        startleft = parseInt(target.css('left'), 10);
        type = 'right';
        canmove = true;
    });

    $('body').on('mousemove', function (e) {
        if (canmove) {
            var pos = e.pageX - startx + startleft;
            console.log('pos', pos, 'min', self.min, 'max', self.max, 'minVal', self.minVal, 'maxVal', self.maxVal);
            if (type === 'left') {
                if (pos <= 0) {
                    pos = 0;
                }
                if (pos >= self.max) {
                    pos = self.max;
                }
                self.min = pos;

                self.startVal.html(parseInt((pos / self.maxVal) * self.end, 10));
            }
            if (type === 'right') {
                if (pos <= self.min) {
                    pos = self.min;
                }
                if (pos >= self.maxVal) {
                    pos = self.maxVal;
                }
                self.max = pos;
                self.endVal.html(parseInt((pos / self.maxVal) * self.end, 10));
            }
            target.css('left', pos);
            e.preventDefault();
        }
    }).on('mouseup', function () {
        canmove = false;
    });

    $('.comming-filter-bar-button').on('click', function () {
        var key = $('.comming-filter input').val();
        var start = $('.comming-filter-range span').eq(0).html();
        var end = $('.comming-filter-range span').eq(1).html();
        if (!community.data) {
            return false;
        }
        // console.log(key, start, self.end);
        this.communityDataInit(key, start, end);
        this.communityMask.draw();
    });
}

SearchBox.prototype.init = function () {

    $('.comming-filter-bar-tips span').eq(0).html(this.start);
    $('.comming-filter-bar-tips span').eq(1).html(this.end);
    this.endHandle.css('left', this.maxVal);
    this.startHandle.css('left', 0);
    this.min = 0;
    this.max = this.maxVal;
    this.startVal.html(this.start);
    this.endVal.html(this.end);
};

SearchBox.prototype.changeRange = function (start, end) {
    // console.log('change range')
    this.start = start;
    this.end = end;
    this.init();
}

export default PageNearByUser;