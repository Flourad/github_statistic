/**
 * @file
 * Created by jinjiaxing on 16/3/17.
 */

function MapMask(options) {
    this.options = options || {};
    this._map = options.map;
    if (options.map) {
        this.mercatorProjection = options.map.getMapType().getProjection();
    }
}
MapMask.prototype = new window.BMap.Overlay();
MapMask.prototype.initialize = function (map) {
    var self = this;
    this._map = map;
    var element = this.element = document.createElement('canvas');

    var shadow = this.shadow = document.createElement('canvas');
    var size = map.getSize();
    element.width = shadow.width = size.width * 2;
    element.height = shadow.height = size.height * 2;
    element.style.cssText = 'position:absolute;' + 'left:0;' + 'top:0;';
    // console.log(map.getPanes());
    map.getPanes().mapPane.appendChild(this.element);
    var me = this;
    map.addEventListener('moving', function () {
        me.draw();
    });
    map.addEventListener('resize', function (e) {
        var size = e.size;
        element.width = shadow.width = size.width * 2;
        element.height = shadow.height = size.height * 2;
        me.draw();
    });

    $(this.element).on('mousemove', function (e) {
        var color = shadow.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data;
        if (color[0] === 0 && color[1] === 0 && color[2] === 0) {
            self.communityMouseout && self.communityMouseout();
        } else {
            var index = self.colorIndex[color[0] * 255 * 255 + color[1] * 255 + color[2]];
            self.communityHover && self.communityHover(index, e);
        }
    });

    return this.element;
};
MapMask.prototype.draw = function () {
    var map = this._map;
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var pixel = map.pointToOverlayPixel(new window.BMap.Point(sw.lng, ne.lat));
    this.element.style.left = this.shadow.style.left = pixel.x + 'px';
    this.element.style.top = this.shadow.style.top = pixel.y + 'px';
    this.dispatchEvent('draw');
};

MapMask.prototype.getContainer = function () {
    return this.element;
};

MapMask.prototype.show = function () {
    this._map.addOverlay(this, {
        zIndex: 1
    });
};

MapMask.prototype.hide = function () {
    this._map.removeOverlay(this);
};

export default MapMask;

