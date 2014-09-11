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

        this._options = {
            progress: 100,
            // gradientStart: 'rgb(11,178,180)',
            // gradientStop: 'rgb(0,255,114)',
            gradientStart: null,
            gradientStop: null,
            background: 'rgb(0,255,255)',
            strokeWidth: 5,
            size: 200
        };
    }

    function _createRound(){
        // Calculate Size
        var progress = this._options.progress > 99.9999 ? 99.9999 : this._options.progress;
        progress = progress < 0 ? 0 : progress;

        var degrees = ((progress / 100) * 360) - 90,
            radians = (Math.PI * degrees) / 180,
            radius = (this._options.size / 2) - this._options.strokeWidth,
            offsetY = this._options.strokeWidth,
            offsetX = this._options.size / 2,
            y = Math.sin(radians) * radius + (radius + offsetY),
            x = Math.cos(radians) * radius + offsetX,
            arc = progress > 50 ? 1 : 0;

        var path = [
            "M " + offsetX + ", " + offsetY,
            "A " + radius + ", " + radius, 0, arc, 1, x, y
        ].join(",");


        var svgElem = this.svgElem = document.createElementNS(xmlns, 'svg');
        svgElem.setAttributeNS (null, "width", this._options.size);
        svgElem.setAttributeNS (null, "height", this._options.size);
        // create path
        var rpath = this.rpath = document.createElementNS (xmlns, "path");
        rpath.setAttributeNS (null, 'stroke', this._options.background);
        rpath.setAttributeNS (null, 'stroke-width', this._options.strokeWidth);
        rpath.setAttributeNS (null, 'd', path);
        rpath.setAttributeNS (null, 'fill', "none");
        rpath.setAttributeNS (null, 'opacity', 1.0);

        svgElem.appendChild(rpath);

        document.getElementById (this.svgContainer).appendChild(svgElem);
        var pathSize = rpath.getTotalLength();

        rpath.style.webkitTransition = "stroke-dashoffset 2s ease-in-out";
        rpath.style.strokeDashoffset = pathSize;
        rpath.style.strokeDasharray = pathSize;

        setTimeout(function() {
            rpath.style.strokeDashoffset = 0;
        }, 0);
    }

    function _getPathSize(){
        this.pathSize = this.rpath.getTotalLength();
    }




    var roundpJs = function(targetElm) {
        if (typeof(targetElm) === 'object') {
            //Ok, create a new instance
            return new RoundpJs(targetElm);

        } else if (typeof(targetElm) === 'string') {
            //select the target element with query selector
            var targetElement = document.querySelectorAll(targetElm);

            if (targetElement) {
                return new RoundpJs(targetElm, {});
            } else {
                throw new Error('There is no element with given selector.');
            }
        } else {
            return new RoundpJs(document.body);
        }
    };
    /**
     * Current RoundpJs version
     *
     * @property version
     * @type String
     */
    roundpJs.version = VERSION;

    //Prototype
    roundpJs.fn = RoundpJs.prototype = {
        init: function(){

            _createRound.call(this)
        }
    };

    exports.roundpJs = roundpJs;
    return roundpJs;
}));
