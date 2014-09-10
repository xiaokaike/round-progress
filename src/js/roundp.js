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
    /**
     * RoundpJs main class
     *
     * @class RoundpJs
     */
    function RoundpJs(obj) {

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
            //progress bar theme
            theme: 'blue',
            //overlay mode makes an overlay layer in the target element
            overlayMode: false,
            //to consider CSS3 transitions in events
            considerTransition: true
        };
    }



    var roundpJs = function(targetElm) {
        if (typeof(targetElm) === 'object') {
            //Ok, create a new instance
            return new RoundpJs(targetElm);

        } else if (typeof(targetElm) === 'string') {
            //select the target element with query selector
            var targetElement = document.querySelectorAll(targetElm);

            if (targetElement) {
                return new RoundpJs(targetElement);
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

    };

    exports.roundpJs = roundpJs;
    return roundpJs;
}));
