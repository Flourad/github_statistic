/**
 * @file
 */
class Util {
    constructor() {

    }
}

const OPTIONS = {hour12: false};

Util.formatDate = function (seconds) {
    const date = new Date(seconds * 1000);
    return date.toLocaleString('zh-Hans-CN', OPTIONS);
};

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

export default Util;
