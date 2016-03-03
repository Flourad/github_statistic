var zepto = {}

function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
}

// `$.zepto.Z` swaps out the prototype of the given `dom` array
// of nodes with `$.fn` and thus supplying all the Zepto functions
// to the array. This method can be overriden in plugins.
zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
}

// `$.zepto.isZ` should return `true` if the given object is a Zepto
// collection. This method can be overriden in plugins.
zepto.isZ = function(object) {
    return object instanceof zepto.Z
}

zepto.init = function(selector, context) {
    return zepto.Z()
}

$ = function(selector, context){
    return zepto.init(selector, context)
}

//$.fn = $.prototype;

var class2type = {}
function type(obj) {
    return obj == null ? String(obj) :
        class2type[toString.call(obj)] || "object"
}

var emptyArray = []
var readyRE = /complete|loaded|interactive/
var isArray = Array.isArray || function(object){ return object instanceof Array }
var slice = emptyArray.slice
var filter = emptyArray.filter
function isFunction(value) { return type(value) == "function" }
function isWindow(obj)     { return obj != null && obj == obj.window }
function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
function isObject(obj)     { return type(obj) == "object" }
function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
}
function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
function likeArray(obj) { return typeof obj.length == 'number' }

function extend(target, source, deep) {
    for (key in source)
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                target[key] = {}
            if (isArray(source[key]) && !isArray(target[key]))
                target[key] = []
            extend(target[key], source[key], deep)
        }
        else if (source[key] !== undefined) target[key] = source[key]
}

// Copy all but undefined properties from one or more
// objects to the `target` object.
$.extend = function(target){
    var deep, args = slice.call(arguments, 1)
    if (typeof target == 'boolean') {
        deep = target
        target = args.shift()
    }
    args.forEach(function(arg){ extend(target, arg, deep) })
    return target
}

$.type = type
$.isFunction = isFunction
$.isWindow = isWindow
$.isArray = isArray
$.isPlainObject = isPlainObject

$.isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
}

$.inArray = function(elem, array, i){
    return emptyArray.indexOf.call(array, elem, i)
}

$.trim = function(str) {
    return str == null ? "" : String.prototype.trim.call(str)
}

$.map = function(elements, callback){
    var value, values = [], i, key
    if (likeArray(elements))
        for (i = 0; i < elements.length; i++) {
            value = callback(elements[i], i)
            if (value != null) values.push(value)
        }
    else
        for (key in elements) {
            value = callback(elements[key], key)
            if (value != null) values.push(value)
        }
    return flatten(values)
}

$.each = function(elements, callback){
    var i, key
    if (likeArray(elements)) {
        for (i = 0; i < elements.length; i++)
            if (callback.call(elements[i], i, elements[i]) === false) return elements
    } else {
        for (key in elements)
            if (callback.call(elements[key], key, elements[key]) === false) return elements
    }

    return elements
}

$.grep = function(elements, callback){
    return filter.call(elements, callback)
}

if (window.JSON) $.parseJSON = JSON.parse

// Populate the class2type map
$.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type[ "[object " + name + "]" ] = name.toLowerCase()
})


$.fn = {
    constructor: zepto.Z,
    length: 0,

    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    splice: emptyArray.splice,
    indexOf: emptyArray.indexOf,
    concat: function(){
        var i, value, args = []
        for (i = 0; i < arguments.length; i++) {
            value = arguments[i]
            args[i] = zepto.isZ(value) ? value.toArray() : value
        }
        return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
    },

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function(fn){
        return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
    },
    slice: function(){
        return $(slice.apply(this, arguments))
    },

    each: function(callback){
        emptyArray.every.call(this, function(el, idx){
            return callback.call(el, idx, el) !== false
        })
        return this
    },
    ready: function(callback){
        // need to check if document.body exists for IE as that browser reports
        // document ready when it hasn't yet created the body element
        if (readyRE.test(document.readyState) && document.body) callback($)
        else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
        return this
    },
    get: function(idx){
        return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
    },
    toArray: function(){ return this.get() },
    size: function(){
        return this.length
    }
}
zepto.Z.prototype = Z.prototype = $.fn
$.zepto = zepto

module.exports = $;
