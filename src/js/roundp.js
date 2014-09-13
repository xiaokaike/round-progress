/**
 * Progress.js v0.1.0
 */

(function(root, factory) {
    if (typeof exports === 'object') {
        // CommonJS
        factory(exports);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else {
        // Browser globals
        factory(root);
    }
}(this, function(exports) {
    //Default config/variables
    var VERSION = '0.0.1';
    var xmlns = 'http://www.w3.org/2000/svg';
    
    // set attr 
    function _setAttributeNS(el, obj){
        var o,
            hasOwn = Object.prototype.hasOwnProperty;

        for (o in obj) {
            if (hasOwn.call(obj, o)) { // filter
                el.setAttributeNS(null, o, obj[o]);
            }
        }
    }
    var polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    function _renderState(value){
        // Calculate Size
        var total = 100,
            stroke = this._ops.stroke,
            R = this._ops.radius,
            size = R*2 + parseInt(stroke)*2 ;

        // credit to http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
        var value       = value >= total ? total - 0.00001 : value,
            type        = 359.9999,
            perc        = (value/total)*type,
            x           = size/2,
            start       = polarToCartesian(x, x, R, perc), // in this case x and y are the same
            end         = polarToCartesian(x, x, R, 0),
            // arcSweep = endAngle - startAngle <= 180 ? "0" : "1",
            arcSweep    = (perc <= 180 ? "0" : "1"),
            d = [
                "M", start.x, start.y, 
                "A", R, R, 0, arcSweep, 0, end.x, end.y
            ].join(" ");

        // path set attr
        _setAttributeNS(this.rpath, {
            'd': d,
        });
    }

    function _renderRound(){

        // create path
        var svgElem = this.svgElem = document.createElementNS(xmlns, 'svg'),
            circle = document.createElementNS(xmlns, 'circle'),
            rpath = this.rpath = document.createElementNS (xmlns, "path");

        var radius = this._ops.radius,
            stroke = this._ops.stroke;

        var size = radius*2 + parseInt(stroke)*2;
        // svgElem set attr
        _setAttributeNS(svgElem, {
            'width': size,
            'height': size
        });
        // circle set attr
        _setAttributeNS(circle, {
            'cx': radius,
            'cy': radius,
            'stroke': this._ops.bgc,
            'stroke-width': stroke,
            'r': radius,
            'fill': "none",
            'opacity': 1.0,
            'transform': 'translate('+ stroke +', '+ stroke +')',
        });
        // path set attr
        _setAttributeNS(rpath, {
            'stroke': this._ops.color,
            'stroke-width': stroke,
            'fill': "none",
            'opacity': 1.0,
        });
        _renderState.call(this, 0);
        svgElem.appendChild(circle);
        svgElem.appendChild(rpath);

        document.getElementById (this.svgContainer).appendChild(svgElem);

        circle.style.transform = 'translate(15, 15)';

        rpath.style.webkitTransition = 'stroke-dashoffset 0.3s ease-in-out';

        var pathSize = this.pathSize = rpath.getTotalLength();
        // rpath.style.strokeDashoffset = pathSize;
        // rpath.style.strokeDasharray = pathSize;

        setTimeout(function() {
            // rpath.style.strokeDashoffset = 0;
        }, 0);
    }


    function _getPathSize(){
        this.pathSize = this.rpath.getTotalLength();
    }

    function _increasePercent(percent){
        _renderState.call(this, percent);
    }

    function _setPercent(percent){
    }

    /**
     * RoundpJs main class
     *
     * @class RoundpJs
     */
    function RoundpJs(svgContainer, obj) {

        this.svgContainer = svgContainer;
        if (typeof obj.length != 'undefined') {
            this._targetElement = obj;
        } else {
            this._targetElement = [obj];
        }

        if (typeof window._roundpjsId === 'undefined')
            window._roundpjsId = 1;

        if (typeof window._roundpjsIntervals === 'undefined')
            window._roundpjsIntervals = {};

        this._ops = {
            progress: 100,
            // gradientStart: 'rgb(11,178,180)',
            // gradientStop: 'rgb(0,255,114)',
            gradientStart: null,
            gradientStop: null,
            color: 'rgb(0,255,255)',
            bgc: 'rgb(234, 234, 234)',
            stroke: 15,
            radius: 100
        };
        this.init();
    }


    //Prototype
    RoundpJs.prototype = {
        version: VERSION,

        init: function(){
            _renderRound.call(this);
            return this;
        },
        increase: function(percent){
            _increasePercent.call(this, percent);
            return this;
        },
        set: function(percent){
            _setPercent.call(this, percent);
            return this;
        }
    };

    exports.RoundpJs = RoundpJs;
    return RoundpJs;
}));
