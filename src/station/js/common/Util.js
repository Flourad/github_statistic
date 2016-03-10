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

export default Util;
