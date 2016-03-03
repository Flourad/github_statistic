var $ = require('./lib.core.js');
require('./lib.defer.js')($);
require('./lib.ajax.js')($);

var React = require("react");
var ReactDOM = require("react-dom");
var Reflux = require("reflux");
var router = require('./router.js');
var ReactIScroll = require('react-iscroll');
var iScroll = require('iscroll');

window.$ = $;
window.React = React;
window.ReactDOM = ReactDOM;
window.Reflux = Reflux;
window.router = router;
window.ReactIScroll = ReactIScroll;
window.iScroll = iScroll;

